import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || ''
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''

// Use service role client securely on the server side to fetch private progress data and generate signed URLs
// During build time, if keys are missing, we fall back to a safe placeholder to prevent build crash
const supabase = createClient(
  SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_SERVICE_ROLE_KEY || 'placeholder'
)

export async function POST(req: Request) {
  try {
    const { orderNo, accessCode } = await req.json()

    if (!orderNo || !accessCode) {
      return NextResponse.json({ error: 'Order number and access code are required' }, { status: 400 })
    }

    const normalizedOrder = String(orderNo).trim().toUpperCase()
    const normalizedCode = String(accessCode).trim().toUpperCase()

    // 1. Verify the order exists and matches credentials
    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .select('*')
      .eq('order_no', normalizedOrder)
      .eq('access_code', normalizedCode)
      .eq('query_enabled', true)
      .maybeSingle()

    if (orderErr) {
      console.error('Order query DB error:', orderErr)
      return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 500 })
    }

    if (!order) {
      // Secure uniform warning prevents guessing credentials
      return NextResponse.json({ error: 'Invalid order number or access code' }, { status: 401 })
    }

    // 2. Fetch customer visible progress timeline
    const { data: progressList, error: progressErr } = await supabase
      .from('order_progress')
      .select('*')
      .eq('order_id', order.id)
      .eq('visible_to_customer', true)
      .order('created_at', { ascending: false })

    if (progressErr) {
      console.error('Progress query DB error:', progressErr)
      return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 500 })
    }

    // 3. For each progress entry, fetch image metadata and generate private temp signed URLs
    const formattedProgress: any[] = []

    for (const entry of progressList || []) {
      const { data: imageRows, error: imgErr } = await supabase
        .from('order_progress_images')
        .select('*')
        .eq('progress_id', entry.id)

      if (imgErr) {
        console.error('Images query DB error:', imgErr)
        continue
      }

      const images: any[] = []

      for (const img of imageRows || []) {
        // Generate a 1-hour secure URL link to prevent direct URL sniffing
        const { data: signed, error: signErr } = await supabase.storage
          .from(img.bucket || 'order-assets')
          .createSignedUrl(img.file_path, 3600)

        if (signErr) {
          console.error('Image signing error:', signErr)
          continue
        }

        images.push({
          id: img.id,
          url: signed?.signedUrl || '',
          fileName: img.file_name
        })
      }

      formattedProgress.push({
        id: entry.id,
        title: entry.title,
        content: entry.content,
        status: entry.status || entry.title,
        visibleToCustomer: entry.visible_to_customer,
        createdAt: entry.created_at,
        images: images
      })
    }

    const payload = {
      order: {
        id: order.id,
        orderNo: order.order_no,
        customerName: order.customer_name,
        currentStatus: order.current_status || 'Order Placed',
        logisticsInfo: order.customer_phone ? `Contact Phone: ${order.customer_phone}` : null,
        updatedAt: order.updated_at,
        progress: formattedProgress
      }
    }

    return NextResponse.json(payload, { status: 200 })
  } catch (err) {
    console.error('Order tracking API error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
