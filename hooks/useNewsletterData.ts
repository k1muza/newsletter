"use client";

import { useState, useEffect, useCallback } from "react";
import { defaultData, NewsletterData } from "@/lib/defaultData";

const STORAGE_KEY = "tti_newsletter_data";

export function useNewsletterData() {
  const [data, setData] = useState<NewsletterData>(defaultData);
  const [editMode, setEditMode] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Deep merge to pick up any new default fields
        setData((prev) => deepMerge(prev, parsed));
      }
    } catch {
      // ignore parse errors
    }
    setLoaded(true);
  }, []);

  const updateData = useCallback((updater: (prev: NewsletterData) => NewsletterData) => {
    setData((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // quota exceeded — silently fail
      }
      return next;
    });
  }, []);

  const updateField = useCallback(
    (path: string, value: unknown) => {
      updateData((prev) => {
        const next = structuredClone(prev) as unknown as Record<string, unknown>;
        const keys = path.split(".");
        let cursor = next;
        for (let i = 0; i < keys.length - 1; i++) {
          cursor = cursor[keys[i]] as Record<string, unknown>;
        }
        cursor[keys[keys.length - 1]] = value;
        return next as unknown as NewsletterData;
      });
    },
    [updateData]
  );

  const resetToDefault = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData(defaultData);
  }, []);

  return { data, editMode, setEditMode, updateField, updateData, resetToDefault, loaded };
}

function deepMerge<T>(target: T, source: Partial<T>): T {
  if (typeof source !== "object" || source === null) return source as T;
  if (typeof target !== "object" || target === null) return source as T;
  const result = { ...target };
  for (const key of Object.keys(source) as Array<keyof T>) {
    const srcVal = source[key];
    const tgtVal = target[key];
    if (Array.isArray(srcVal)) {
      (result as Record<keyof T, unknown>)[key] = srcVal;
    } else if (typeof srcVal === "object" && srcVal !== null) {
      (result as Record<keyof T, unknown>)[key] = deepMerge(tgtVal, srcVal as Partial<T[keyof T]>);
    } else {
      (result as Record<keyof T, unknown>)[key] = srcVal;
    }
  }
  return result;
}
