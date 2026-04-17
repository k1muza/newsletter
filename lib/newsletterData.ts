import { getDefaultNewsletterData, type NewsletterData } from "@/lib/defaultData";

export const DEFAULT_NEWSLETTER_DOCUMENT_ID = "default";
export const NEWSLETTER_DATA_BUCKET = "newsletter-data";
export const NEWSLETTER_IMAGE_BUCKET = "newsletter-images";
export const NEWSLETTER_STORAGE_DIRECTORY = "newsletters";

export function normalizeNewsletterDocumentId(value?: string | null) {
  const normalized = value?.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
  return normalized || DEFAULT_NEWSLETTER_DOCUMENT_ID;
}

export function getNewsletterContentPath(documentId: string) {
  return `${NEWSLETTER_STORAGE_DIRECTORY}/${documentId}/content.json`;
}

export function mergeNewsletterData(
  source?: Partial<NewsletterData> | null,
  documentId?: string
): NewsletterData {
  return deepMerge(structuredClone(getDefaultNewsletterData(documentId)), source ?? {});
}

function deepMerge<T>(target: T, source: Partial<T>): T {
  if (typeof source !== "object" || source === null) {
    return source as T;
  }

  if (typeof target !== "object" || target === null) {
    return source as T;
  }

  const result = { ...target };

  for (const key of Object.keys(source) as Array<keyof T>) {
    const srcVal = source[key];
    const tgtVal = target[key];

    if (Array.isArray(srcVal)) {
      (result as Record<keyof T, unknown>)[key] = srcVal;
      continue;
    }

    if (typeof srcVal === "object" && srcVal !== null) {
      (result as Record<keyof T, unknown>)[key] = deepMerge(tgtVal, srcVal as Partial<T[keyof T]>);
      continue;
    }

    (result as Record<keyof T, unknown>)[key] = srcVal;
  }

  return result;
}
