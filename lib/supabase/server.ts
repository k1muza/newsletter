import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NEWSLETTER_DATA_BUCKET, NEWSLETTER_IMAGE_BUCKET } from "@/lib/newsletterData";

let adminClient: SupabaseClient | null = null;
const ensuredBuckets = new Map<string, Promise<void>>();

interface StorageErrorLike {
  message: string;
}

interface EnsureBucketOptions {
  allowedMimeTypes?: string[];
  fileSizeLimit?: string;
  isPublic: boolean;
}

export function getSupabaseAdminClient() {
  if (adminClient) {
    return adminClient;
  }

  const url = normalizeSupabaseUrl(process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL);
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local."
    );
  }

  adminClient = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return adminClient;
}

export function getSupabaseNewsletterDataBucket() {
  return normalizeBucketName(process.env.SUPABASE_NEWSLETTER_DATA_BUCKET) ?? NEWSLETTER_DATA_BUCKET;
}

export function getSupabaseNewsletterImageBucket() {
  return (
    normalizeBucketName(process.env.SUPABASE_NEWSLETTER_IMAGE_BUCKET) ??
    normalizeBucketName(process.env.SUPABASE_STORAGE_BUCKET) ??
    NEWSLETTER_IMAGE_BUCKET
  );
}

export async function ensureSupabaseNewsletterDataBucket() {
  await ensureSupabaseBucket(getSupabaseNewsletterDataBucket(), {
    allowedMimeTypes: ["application/json"],
    fileSizeLimit: "5MB",
    isPublic: false,
  });
}

export async function ensureSupabaseNewsletterImageBucket() {
  await ensureSupabaseBucket(getSupabaseNewsletterImageBucket(), {
    allowedMimeTypes: ["image/*"],
    fileSizeLimit: "10MB",
    isPublic: true,
  });
}

export function isSupabaseObjectNotFoundError(error: StorageErrorLike | Error | null | undefined) {
  const message = error?.message?.toLowerCase() ?? "";
  return (
    message.includes("not found") ||
    message.includes("does not exist") ||
    message.includes("no such file")
  );
}

async function ensureSupabaseBucket(bucketName: string, options: EnsureBucketOptions) {
  const existingPromise = ensuredBuckets.get(bucketName);

  if (existingPromise) {
    return existingPromise;
  }

  const promise = (async () => {
    const supabase = getSupabaseAdminClient();
    const bucketOptions = {
      allowedMimeTypes: options.allowedMimeTypes,
      fileSizeLimit: options.fileSizeLimit,
      public: options.isPublic,
    };

    const { error: createError } = await supabase.storage.createBucket(bucketName, bucketOptions);

    if (!createError) {
      return;
    }

    if (!isBucketAlreadyExistsError(createError)) {
      throw createError;
    }

    const { error: updateError } = await supabase.storage.updateBucket(bucketName, bucketOptions);

    if (updateError) {
      throw updateError;
    }
  })();

  ensuredBuckets.set(bucketName, promise);

  try {
    await promise;
  } catch (error) {
    ensuredBuckets.delete(bucketName);
    throw error;
  }
}

function isBucketAlreadyExistsError(error: StorageErrorLike) {
  return error.message.toLowerCase().includes("already exists");
}

function normalizeBucketName(value: string | undefined) {
  const normalized = value?.trim();
  return normalized || undefined;
}

function normalizeSupabaseUrl(value: string | undefined) {
  const normalized = value?.trim().replace(/\/+$/g, "");
  return normalized || undefined;
}
