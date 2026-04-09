import { NextResponse } from 'next/server';
import { getCorsHeaders } from '../../cors';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() });
}

export async function GET() {
  return NextResponse.json(
    { id: 1, name: "Admin" },
    { headers: getCorsHeaders() }
  );
}
