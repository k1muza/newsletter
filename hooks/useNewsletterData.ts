"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  createEmptyImageAsset,
  type NewsletterData,
  type NewsletterImageAsset,
} from "@/lib/defaultData";
import {
  DEFAULT_NEWSLETTER_DOCUMENT_ID,
  mergeNewsletterData,
} from "@/lib/newsletterData";

type SaveState = "loading" | "idle" | "saving" | "saved" | "error";

interface NewsletterResponse {
  data?: NewsletterData;
  error?: string;
}

interface UploadResponse {
  error?: string;
  image?: NewsletterImageAsset;
}

export function useNewsletterData(documentId = DEFAULT_NEWSLETTER_DOCUMENT_ID) {
  const [data, setData] = useState<NewsletterData>(() => mergeNewsletterData(null));
  const [editMode, setEditMode] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadingPaths, setUploadingPaths] = useState<Record<string, boolean>>({});

  const pendingSaveRef = useRef(false);
  const saveTimeoutRef = useRef<number | null>(null);
  const saveRequestRef = useRef(0);
  const documentUrl = useMemo(
    () => `/api/newsletter?document=${encodeURIComponent(documentId)}`,
    [documentId]
  );

  const persistData = useCallback(
    async (nextData: NewsletterData) => {
      const requestId = ++saveRequestRef.current;
      const response = await fetch(documentUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: nextData }),
      });

      if (!response.ok) {
        throw new Error(await readErrorMessage(response));
      }

      if (requestId === saveRequestRef.current) {
        setSaveState("saved");
      }
    },
    [documentUrl]
  );

  useEffect(() => {
    const controller = new AbortController();

    pendingSaveRef.current = false;
    saveRequestRef.current += 1;
    if (saveTimeoutRef.current !== null) {
      window.clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }

    async function loadNewsletter() {
      setLoaded(false);
      setSaveState("loading");
      setErrorMessage(null);

      try {
        const response = await fetch(documentUrl, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(await readErrorMessage(response));
        }

        const payload = (await response.json()) as NewsletterResponse;
        setData(mergeNewsletterData(payload.data ?? null));
        setSaveState("idle");
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setData(mergeNewsletterData(null));
        setSaveState("error");
        setErrorMessage(getErrorMessage(error));
      } finally {
        if (!controller.signal.aborted) {
          setLoaded(true);
        }
      }
    }

    void loadNewsletter();

    return () => {
      controller.abort();

      if (saveTimeoutRef.current !== null) {
        window.clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }
    };
  }, [documentUrl]);

  useEffect(() => {
    if (!loaded || !pendingSaveRef.current) {
      return;
    }

    pendingSaveRef.current = false;

    if (saveTimeoutRef.current !== null) {
      window.clearTimeout(saveTimeoutRef.current);
    }

    setSaveState("saving");
    setErrorMessage(null);

    saveTimeoutRef.current = window.setTimeout(() => {
      void persistData(data).catch((error: unknown) => {
        setSaveState("error");
        setErrorMessage(getErrorMessage(error));
      });
    }, 500);
  }, [data, loaded, persistData]);

  const updateData = useCallback((updater: (prev: NewsletterData) => NewsletterData) => {
    pendingSaveRef.current = true;
    setData((prev) => updater(prev));
  }, []);

  const updateField = useCallback(
    (path: string, value: unknown) => {
      updateData((prev) => {
        const next = structuredClone(prev) as unknown as Record<string, unknown>;
        const keys = path.split(".");
        let cursor = next;

        for (let i = 0; i < keys.length - 1; i += 1) {
          cursor = cursor[keys[i]] as Record<string, unknown>;
        }

        cursor[keys[keys.length - 1]] = value;
        return next as unknown as NewsletterData;
      });
    },
    [updateData]
  );

  const resetToDefault = useCallback(() => {
    pendingSaveRef.current = true;
    setData(mergeNewsletterData(null));
    setSaveState("saving");
    setErrorMessage(null);
  }, []);

  const uploadImage = useCallback(
    async (path: string, file: File) => {
      setUploadingPaths((prev) => ({
        ...prev,
        [path]: true,
      }));
      setErrorMessage(null);

      try {
        const formData = new FormData();
        formData.set("documentId", documentId);
        formData.set("slot", path);
        formData.set("file", file);

        const response = await fetch("/api/newsletter/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(await readErrorMessage(response));
        }

        const payload = (await response.json()) as UploadResponse;

        if (!payload.image) {
          throw new Error("Upload completed but no image payload was returned.");
        }

        updateField(path, payload.image);
        return payload.image;
      } catch (error) {
        setSaveState("error");
        setErrorMessage(getErrorMessage(error));
        throw error;
      } finally {
        setUploadingPaths((prev) => {
          const next = { ...prev };
          delete next[path];
          return next;
        });
      }
    },
    [documentId, updateField]
  );

  const clearImage = useCallback(
    (path: string) => {
      updateField(path, createEmptyImageAsset());
    },
    [updateField]
  );

  const isUploading = useCallback(
    (path: string) => Boolean(uploadingPaths[path]),
    [uploadingPaths]
  );

  return {
    clearImage,
    data,
    editMode,
    errorMessage,
    isUploading,
    loaded,
    resetToDefault,
    saveState,
    setEditMode,
    updateData,
    updateField,
    uploadImage,
  };
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
}

async function readErrorMessage(response: Response) {
  try {
    const payload = (await response.json()) as { error?: string };

    if (payload.error) {
      return payload.error;
    }
  } catch {
    // Ignore JSON parsing errors and fall back to the status text below.
  }

  return response.statusText || "Request failed.";
}
