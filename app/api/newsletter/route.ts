import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import type { NewsletterData } from "@/lib/defaultData";
import {
  DEFAULT_NEWSLETTER_DOCUMENT_ID,
  getNewsletterContentPath,
  mergeNewsletterData,
  normalizeNewsletterDocumentId,
} from "@/lib/newsletterData";
import {
  ensureSupabaseNewsletterDataBucket,
  getSupabaseAdminClient,
  getSupabaseNewsletterDataBucket,
  isSupabaseObjectNotFoundError,
} from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface NewsletterDocumentRecord {
  documentId?: string;
  content: Partial<NewsletterData> | null;
  updatedAt: string | null;
}

interface NewsletterPayload {
  data?: Partial<NewsletterData>;
}

export async function GET(request: Request) {
  try {
    if (!(await getCurrentUser())) {
      return jsonNoStore(
        {
          error: "Authentication required.",
        },
        { status: 401 }
      );
    }

    const documentId = getDocumentId(request);
    const data = await readNewsletterRecord(documentId);

    return jsonNoStore({
      data: mergeNewsletterData(data?.content ?? null, documentId),
      documentId,
      updatedAt: data?.updatedAt ?? null,
    });
  } catch (error) {
    return jsonNoStore(
      {
        error: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await getCurrentUser())) {
      return jsonNoStore(
        {
          error: "Authentication required.",
        },
        { status: 401 }
      );
    }

    const payload = (await request.json()) as NewsletterPayload;

    if (!payload?.data || typeof payload.data !== "object") {
      return jsonNoStore(
        {
          error: "Invalid newsletter payload.",
        },
        { status: 400 }
      );
    }

    const documentId = getDocumentId(request);
    const content = mergeNewsletterData(payload.data, documentId);
    const updatedAt = new Date().toISOString();
    const record: NewsletterDocumentRecord = {
      content,
      documentId,
      updatedAt,
    };

    await writeNewsletterRecord(documentId, record);

    return jsonNoStore({
      data: content,
      documentId,
      updatedAt,
    });
  } catch (error) {
    return jsonNoStore(
      {
        error: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}

function getDocumentId(request: Request) {
  const url = new URL(request.url);
  return normalizeNewsletterDocumentId(url.searchParams.get("document") ?? DEFAULT_NEWSLETTER_DOCUMENT_ID);
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown Supabase error.";
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

async function readNewsletterRecord(documentId: string) {
  const supabase = getSupabaseAdminClient();
  const bucketName = getSupabaseNewsletterDataBucket();
  const filePath = getNewsletterContentPath(documentId);

  await ensureSupabaseNewsletterDataBucket();

  const { data, error } = await supabase.storage.from(bucketName).download(filePath);

  if (error) {
    if (isSupabaseObjectNotFoundError(error)) {
      return null;
    }

    throw error;
  }

  const payload = (await data.text()).trim();

  if (!payload) {
    return null;
  }

  try {
    return JSON.parse(payload) as NewsletterDocumentRecord;
  } catch {
    throw new Error(`Newsletter content for "${documentId}" is not valid JSON.`);
  }
}

async function writeNewsletterRecord(documentId: string, record: NewsletterDocumentRecord) {
  const supabase = getSupabaseAdminClient();
  const bucketName = getSupabaseNewsletterDataBucket();
  const filePath = getNewsletterContentPath(documentId);

  await ensureSupabaseNewsletterDataBucket();

  const { error } = await supabase.storage.from(bucketName).upload(filePath, JSON.stringify(record), {
    cacheControl: "0",
    contentType: "application/json",
    upsert: true,
  });

  if (error) {
    throw error;
  }
}
