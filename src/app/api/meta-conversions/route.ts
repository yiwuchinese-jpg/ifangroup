import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

const META_PIXEL_ID = process.env.META_PIXEL_ID;
const META_CONVERSIONS_ACCESS_TOKEN = process.env.META_CONVERSIONS_ACCESS_TOKEN;

type ConversionRequestBody = {
  eventName?: string;
  eventId?: string;
  eventSourceUrl?: string;
  testEventCode?: string;
  landingPage?: string;
  fbp?: string;
  fbc?: string;
  userData?: {
    email?: string;
    whatsapp?: string;
    name?: string;
  };
  customData?: Record<string, string | number | boolean | null | undefined>;
};

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeEmail(value?: string) {
  if (!value) return "";
  return value.trim().toLowerCase();
}

function normalizePhone(value?: string) {
  if (!value) return "";
  return value.replace(/[^\d+]/g, "");
}

function normalizeName(value?: string) {
  if (!value) return "";
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function compactObject<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined && item !== null && item !== ""));
}

export async function POST(request: NextRequest) {
  try {
    if (!META_CONVERSIONS_ACCESS_TOKEN) {
      return NextResponse.json({ error: "META_CONVERSIONS_ACCESS_TOKEN is not configured" }, { status: 500 });
    }
    if (!META_PIXEL_ID) {
      return NextResponse.json({ error: "META_PIXEL_ID is not configured" }, { status: 500 });
    }

    const body = (await request.json()) as ConversionRequestBody;
    const eventName = body.eventName?.trim();

    if (!eventName) {
      return NextResponse.json({ error: "eventName is required" }, { status: 400 });
    }

    const normalizedEmail = normalizeEmail(body.userData?.email);
    const normalizedPhone = normalizePhone(body.userData?.whatsapp);
    const normalizedName = normalizeName(body.userData?.name);
    const [firstName = "", ...restNames] = normalizedName.split(" ");
    const lastName = restNames.join(" ");

    const clientIpAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      undefined;
    const clientUserAgent = request.headers.get("user-agent") || undefined;

    const userData = compactObject({
      em: normalizedEmail ? [sha256(normalizedEmail)] : undefined,
      ph: normalizedPhone ? [sha256(normalizedPhone)] : undefined,
      fn: firstName ? [sha256(firstName)] : undefined,
      ln: lastName ? [sha256(lastName)] : undefined,
      fbp: body.fbp,
      fbc: body.fbc,
      client_ip_address: clientIpAddress,
      client_user_agent: clientUserAgent,
    });

    const customData = compactObject({
      landing_page: body.landingPage,
      ...body.customData,
    });

    const testEventCode = body.testEventCode?.trim() || process.env.META_TEST_EVENT_CODE;

    const metaResponse = await fetch(`https://graph.facebook.com/v23.0/${META_PIXEL_ID}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          compactObject({
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            event_id: body.eventId,
            action_source: "website",
            event_source_url: body.eventSourceUrl,
            user_data: userData,
            custom_data: Object.keys(customData).length ? customData : undefined,
          }),
        ],
        test_event_code: testEventCode,
        access_token: META_CONVERSIONS_ACCESS_TOKEN,
      }),
    });

    const result = await metaResponse.json();

    if (!metaResponse.ok) {
      console.error("Meta conversion API error:", result);
      return NextResponse.json({ error: "Meta conversion request failed", details: result }, { status: 502 });
    }

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error("Meta conversion route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
