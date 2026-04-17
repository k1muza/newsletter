## Supabase setup

This app now stores newsletter JSON in a private Supabase Storage bucket and uploaded images in a public Supabase Storage bucket.

### 1. Add environment variables

Set these in `.env.local`:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_NEWSLETTER_DATA_BUCKET=newsletter-data
SUPABASE_NEWSLETTER_IMAGE_BUCKET=newsletter-images
```

`SUPABASE_NEWSLETTER_DATA_BUCKET` and `SUPABASE_NEWSLETTER_IMAGE_BUCKET` are optional. The defaults shown above will be used if you omit them.

### 2. Restart the app

After updating `.env.local`, restart `next dev` so the server picks up the new values.

### 3. First request behavior

On first save or first image upload, the app will create the buckets automatically if they do not already exist:

- `newsletter-data`
  Used for the JSON document backing the editor. This bucket is private.
- `newsletter-images`
  Used for uploaded images. This bucket is made public so the newsletter can render direct image URLs.

### 4. Stored paths

- Newsletter content: `newsletters/<document-id>/content.json`
- Images: `newsletters/<document-id>/<slot>/<timestamp>-<uuid>.<ext>`
