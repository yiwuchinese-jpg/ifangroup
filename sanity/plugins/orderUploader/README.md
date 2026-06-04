Order Uploader plugin for IFAN Sanity Studio

This is a lightweight tool that allows staff to upload order progress and images.

Configuration (add to .env.local):

- `SANITY_ORDER_UPLOAD_ENDPOINT` - the public URL for the Supabase Edge Function or API route (e.g. https://.../order-tracking)
- `SANITY_ORDER_UPLOAD_KEY` - simple admin key used for internal protection (passed as `x-admin-key` header)

Usage:

1. Start Sanity Studio: `npm run dev` in this folder.
2. Open the Studio, find the Order Uploader tool and use the form to submit.

