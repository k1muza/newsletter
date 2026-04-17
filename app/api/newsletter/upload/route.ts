import { NextResponse } from "next/server";
import type { NewsletterImageAsset } from "@/lib/defaultData";
import {
  DEFAULT_NEWSLETTER_DOCUMENT_ID,
  NEWSLETTER_STORAGE_DIRECTORY,
  normalizeNewsletterDocumentId,
} from "@/lib/newsletterData";
import {
  ensureSupabaseNewsletterImageBucket,
  getSupabaseAdminClient,
  getSupabaseNewsletterImageBucket,
} from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

const MIME_EXTENSIONS: Record<string, string> = {
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/svg+xml": "svg",
  "image/webp": "webp",
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return jsonNoStore(
        {
          error: "Image file is required.",
        },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return jsonNoStore(
        {
          error: "Only image uploads are supported.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_IMAGE_BYTES) {
      return jsonNoStore(
        {
          error: "Images must be 10MB or smaller.",
        },
        { status: 400 }
      );
    }

    const documentId = normalizeNewsletterDocumentId(
      toStringValue(formData.get("documentId")) ?? DEFAULT_NEWSLETTER_DOCUMENT_ID
    );
    const slot = normalizeStorageSegment(toStringValue(formData.get("slot")) ?? "image");
    const extension = getFileExtension(file.name, file.type);
    const storagePath = `${NEWSLETTER_STORAGE_DIRECTORY}/${documentId}/${slot}/${createTimestamp()}-${crypto.randomUUID()}.${extension}`;
    const supabase = getSupabaseAdminClient();
    const bucketName = getSupabaseNewsletterImageBucket();

    await ensureSupabaseNewsletterImageBucket();

    const { error: uploadError } = await supabase.storage.from(bucketName).upload(storagePath, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });

    if (uploadError) {
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(storagePath);

    const image: NewsletterImageAsset = {
      storagePath,
      url: publicUrl,
    };

    return jsonNoStore({ image });
  } catch (error) {
    return jsonNoStore(
      {
        error: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}

function createTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function getFileExtension(filename: string, mimeType: string) {
  const fromName = filename.split(".").pop()?.toLowerCase();

  if (fromName && /^[a-z0-9]+$/.test(fromName)) {
    return fromName;
  }

  return MIME_EXTENSIONS[mimeType] ?? "bin";
}

function normalizeStorageSegment(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "image";
}

function toStringValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value : null;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown Supabase storage error.";
}

function jsonNoStore(body: unknown, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...(init?.headers ?? {}),
    },
  });
}
