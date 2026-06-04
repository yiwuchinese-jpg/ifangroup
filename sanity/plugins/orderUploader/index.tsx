import React, { useState } from 'react'
import { useClient } from 'sanity'

export default function OrderUploaderTool() {
  const client = useClient({ apiVersion: '2024-02-26' })
  const [orderNo, setOrderNo] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const adminKey = process.env.SANITY_ORDER_UPLOAD_KEY || ''

  async function submit() {
    setLoading(true)
    const fd = new FormData()
    fd.append('order_no', orderNo)
    fd.append('customer_email', email)
    fd.append('customer_phone', phone)
    fd.append('title', title)
    fd.append('content', content)
    fd.append('visible', 'true')
    for (const f of files) fd.append('images', f, f.name)

    try {
      const res = await fetch(process.env.SANITY_ORDER_UPLOAD_ENDPOINT || '/api/order-tracking/upload', {
        method: 'POST',
        headers: {
          'x-admin-key': adminKey
        },
        body: fd
      })
      const body = await res.json()
      setResult(body)
    } catch (err) {
      console.error(err)
      setResult({ error: 'failed' })
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Order Progress Uploader</h2>
      <div>
        <label>Order No</label>
        <input value={orderNo} onChange={(e) => setOrderNo(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <div>
        <label>Images</label>
        <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} />
      </div>
      <div>
        <button onClick={submit} disabled={loading}>Upload</button>
      </div>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  )
}

