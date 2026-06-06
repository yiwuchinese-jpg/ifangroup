import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || ''
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''
const ADMIN_KEY = process.env.ORDER_UPLOAD_ADMIN_KEY || ''

// Use service role client securely on the server side to fetch private progress data and generate signed URLs
// During build time, if keys are missing, we fall back to a safe placeholder to prevent build crash
const supabase = createClient(
  SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_SERVICE_ROLE_KEY || 'placeholder'
)

export async function POST(req: Request) {
  const admin = req.headers.get('x-admin-key') || ''
  if (ADMIN_KEY && admin !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const form = await req.formData()
  const orderNo = String(form.get('order_no') || '').trim()
  const customerEmail = String(form.get('customer_email') || '').trim() || null
  const customerPhone = String(form.get('customer_phone') || '').trim() || null
  const title = String(form.get('title') || '').trim()
  const content = String(form.get('content') || '').trim()
  const visible = String(form.get('visible') || 'true') === 'true'

  if (!orderNo || !title || !content) {
    return NextResponse.json({ error: 'order_no, title and content are required' }, { status: 400 })
  }

  try {
    // similar flow to Edge Function
    const { data: existing } = await supabase.from('orders').select('id, access_code').eq('order_no', orderNo).maybeSingle()
    let orderId = existing?.id
    let accessCode = existing?.access_code

    if (!orderId) {
      accessCode = String(Math.floor(100000 + Math.random() * 900000))
      const { data: created } = await supabase.from('orders').insert({ order_no: orderNo, customer_email: customerEmail, customer_phone: customerPhone, access_code: accessCode }).select().single()
      orderId = created.id
    }

    const { data: progressRow } = await supabase.from('order_progress').insert({ order_id: orderId, title, content, status: title, visible_to_customer: visible }).select().single()
    const progressId = progressRow.id

    const images: any[] = []
    const files = form.getAll('images') || []
    for (const f of files as any[]) {
      const file = f as File
      if (!file || !file.name) continue
      const buf = Buffer.from(await file.arrayBuffer())
      const ext = file.name.split('.').pop() || 'jpg'
      const imageId = crypto.randomUUID()
      const path = `${orderId}/${progressId}/${imageId}.${ext}`

      await supabase.storage.from('order-assets').upload(path, buf, { contentType: file.type })
      await supabase.from('order_progress_images').insert({ progress_id: progressId, bucket: 'order-assets', file_path: path, file_name: file.name, mime_type: file.type, size_bytes: buf.length })
      const { data: signed } = await supabase.storage.from('order-assets').createSignedUrl(path, 60 * 60)
      images.push({ id: imageId, url: signed?.signedUrl || '', fileName: file.name })
    }

    await supabase.from('orders').update({ last_progress_at: new Date().toISOString(), current_status: title }).eq('id', orderId)

    const notification = `您好，您的订单进度查询已开通。\n订单号：${orderNo}\n查询码：${accessCode || ''}\n请访问查询页面输入订单号和查询码查看最新进度。`

    return NextResponse.json({ order: { id: orderId, order_no: orderNo, access_code: accessCode, current_status: title }, progress: progressRow, images, notification })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'internal_error' }, { status: 500 })
  }
}

