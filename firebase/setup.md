## Legacy Firebase setup

The current app no longer uses Firebase for newsletter persistence or image uploads.
Use [supabase/setup.md](/c:/Users/Kelvin/Desktop/newsletter/supabase/setup.md) instead.

This file is kept only as a reference for the older Firebase-based version.

### 1. Enable services

In the Firebase console for your project:

1. Enable Firestore.
2. Enable Storage.
3. Note the default bucket name shown in Storage. It can look like `your-project-id.firebasestorage.app` on newer projects or `your-project-id.appspot.com` on older projects.
4. If your Firebase project was created on or after October 30, 2024, make sure the project is on the Blaze plan. New default Storage buckets are not provisioned on the free Spark plan.

### 2. Create a service account key

In Google Cloud Console for the same project:

1. Open `IAM & Admin -> Service Accounts`.
2. Create or open a service account for the app.
3. Generate a JSON key.
4. Copy these values into `.env.local`:

```env
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
```

You can also place the full JSON into `FIREBASE_SERVICE_ACCOUNT_JSON`, but the split variables above are usually easier to manage in deployment platforms.

### 3. Data layout

- Firestore collection: `newsletters`
- Document ID: `default` by default
- Storage folder prefix: `newsletters/`
