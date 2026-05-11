"use client";

import { useCallback, useState, type RefObject } from "react";

interface StandaloneHtmlExportOptions {
  documentTitle: string;
  editMode: boolean;
  fileName: string;
  rootRef: RefObject<HTMLElement | null>;
  setEditMode: (value: boolean) => void;
}

interface StandaloneHtmlExportMetaOptions {
  newsletterSlug: string;
  organizationName: string;
  quarter?: string;
  titleAccent?: string;
  titleLead?: string;
  year?: string;
}

const FALLBACK_EXPORT_STYLES = `
html {
  background: radial-gradient(circle at top, #f8fafc 0, #e2e8f0 52%, #cbd5e1 100%);
}

body {
  margin: 0;
}

.screen-only {
  display: none !important;
}
`;

export function useStandaloneHtmlExport({
  documentTitle,
  editMode,
  fileName,
  rootRef,
  setEditMode,
}: StandaloneHtmlExportOptions) {
  const [isExporting, setIsExporting] = useState(false);

  const exportHtml = useCallback(async () => {
    if (isExporting) {
      return;
    }

    const initialRoot = rootRef.current;

    if (!initialRoot) {
      window.alert("Could not find the newsletter content to export.");
      return;
    }

    const activeElement = document.activeElement;

    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }

    setIsExporting(true);

    try {
      if (editMode) {
        setEditMode(false);
        await waitForNextPaint();
      }

      const exportRoot = rootRef.current;

      if (!exportRoot) {
        throw new Error("Could not find the newsletter content after refreshing the preview.");
      }

      const html = await buildStandaloneHtmlDocument({
        documentTitle,
        root: exportRoot,
      });

      downloadTextFile(fileName, html);
    } catch (error) {
      console.error(error);
      window.alert(
        error instanceof Error
          ? error.message
          : "The HTML export failed. Please try again."
      );
    } finally {
      if (editMode) {
        setEditMode(true);
      }

      setIsExporting(false);
    }
  }, [documentTitle, editMode, fileName, isExporting, rootRef, setEditMode]);

  return {
    exportHtml,
    isExporting,
  };
}

export function getStandaloneHtmlExportMeta({
  newsletterSlug,
  organizationName,
  quarter,
  titleAccent,
  titleLead,
  year,
}: StandaloneHtmlExportMetaOptions) {
  const editionTitle = [titleLead, titleAccent].filter(Boolean).join(" ").trim();
  const period = [quarter, year].filter(Boolean).join(" ").trim();
  const documentTitle = [
    organizationName.trim(),
    editionTitle || newsletterSlug.trim(),
    period,
  ]
    .filter(Boolean)
    .join(" - ");

  const fileName =
    `${slugify([organizationName, editionTitle || newsletterSlug, period].join(" ")) || "newsletter"}.html`;

  return {
    documentTitle,
    fileName,
  };
}

async function buildStandaloneHtmlDocument({
  documentTitle,
  root,
}: {
  documentTitle: string;
  root: HTMLElement;
}) {
  const clonedRoot = root.cloneNode(true) as HTMLElement;

  sanitizeClone(clonedRoot);

  const [styles, imageResults] = await Promise.all([
    collectStyleSheetText(),
    inlineImageSources(root, clonedRoot),
  ]);

  const exportedAt = new Date().toISOString();
  const failedImages = imageResults.filter((result) => !result.inlined);
  const warningComment = failedImages.length
    ? `\n<!-- Some images could not be embedded and still point to their source URLs: ${failedImages
        .map((result) => result.url)
        .join(", ")} -->`
    : "";

  return [
    "<!DOCTYPE html>",
    `<html lang="${escapeHtml(document.documentElement.lang || "en")}" class="${escapeHtml(
      document.documentElement.className
    )}">`,
    "<head>",
    '<meta charset="utf-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1" />',
    `<title>${escapeHtml(documentTitle)}</title>`,
    `<meta name="generator" content="TTI Newsletter Studio" />`,
    `<meta name="exported-at" content="${escapeHtml(exportedAt)}" />`,
    `<style>${styles || FALLBACK_EXPORT_STYLES}</style>`,
    "</head>",
    `<body class="${escapeHtml(document.body.className)}">`,
    clonedRoot.outerHTML,
    "</body>",
    `</html>${warningComment}`,
  ].join("\n");
}

async function collectStyleSheetText() {
  const styleSheets = Array.from(document.styleSheets).filter(shouldInlineStyleSheet);
  const chunks: string[] = [];

  for (const styleSheet of styleSheets) {
    let rules: CSSRuleList;

    try {
      rules = styleSheet.cssRules;
    } catch {
      continue;
    }

    const cssText = Array.from(rules, (rule) => rule.cssText).join("\n");

    if (!cssText.trim()) {
      continue;
    }

    const baseUrl = styleSheet.href ?? window.location.href;
    chunks.push(await inlineCssAssetUrls(cssText, baseUrl));
  }

  return `${chunks.join("\n")}\n${FALLBACK_EXPORT_STYLES}`;
}

function shouldInlineStyleSheet(styleSheet: CSSStyleSheet) {
  const ownerNode = styleSheet.ownerNode;

  if (!(ownerNode instanceof Element) || !document.head.contains(ownerNode)) {
    return false;
  }

  if (!styleSheet.href) {
    return true;
  }

  return styleSheet.href.startsWith(window.location.origin);
}

function sanitizeClone(root: HTMLElement) {
  root.querySelectorAll(".screen-only").forEach((element) => element.remove());

  root.querySelectorAll("[contenteditable]").forEach((element) => {
    element.removeAttribute("contenteditable");
    element.removeAttribute("spellcheck");
  });
}

async function inlineImageSources(sourceRoot: HTMLElement, clonedRoot: HTMLElement) {
  const sourceImages = Array.from(sourceRoot.querySelectorAll("img"));
  const clonedImages = Array.from(clonedRoot.querySelectorAll("img"));
  const results: Array<{ inlined: boolean; url: string }> = [];

  await Promise.all(
    clonedImages.map(async (image, index) => {
      const sourceImage = sourceImages[index];
      const rawUrl = sourceImage?.currentSrc || sourceImage?.src || image.getAttribute("src");

      if (!rawUrl) {
        return;
      }

      const resolvedUrl = resolveAssetUrl(rawUrl, window.location.href);
      const dataUrl = await fetchAsDataUrl(resolvedUrl);

      image.removeAttribute("srcset");

      if (dataUrl) {
        image.setAttribute("src", dataUrl);
        results.push({ inlined: true, url: resolvedUrl });
        return;
      }

      image.setAttribute("src", resolvedUrl);
      results.push({ inlined: false, url: resolvedUrl });
    })
  );

  return results;
}

async function inlineCssAssetUrls(cssText: string, baseUrl: string) {
  const matches = Array.from(cssText.matchAll(/url\(([^)]+)\)/g));

  if (matches.length === 0) {
    return cssText;
  }

  let nextCss = "";
  let lastIndex = 0;

  for (const match of matches) {
    const [fullMatch, rawValue] = match;
    const index = match.index ?? 0;

    nextCss += cssText.slice(lastIndex, index);

    const cleanedValue = stripWrappingQuotes(rawValue.trim());

    if (shouldSkipAssetInlining(cleanedValue)) {
      nextCss += fullMatch;
      lastIndex = index + fullMatch.length;
      continue;
    }

    const resolvedUrl = resolveAssetUrl(cleanedValue, baseUrl);
    const dataUrl = await fetchAsDataUrl(resolvedUrl);

    nextCss += dataUrl ? `url("${dataUrl}")` : `url("${resolvedUrl}")`;
    lastIndex = index + fullMatch.length;
  }

  nextCss += cssText.slice(lastIndex);
  return nextCss;
}

function shouldSkipAssetInlining(value: string) {
  return /^(data:|blob:|about:|#)/i.test(value);
}

function stripWrappingQuotes(value: string) {
  return value.replace(/^['"]|['"]$/g, "");
}

function resolveAssetUrl(value: string, baseUrl: string) {
  return new URL(value, baseUrl).href;
}

const dataUrlCache = new Map<string, Promise<string | null>>();

async function fetchAsDataUrl(url: string) {
  const cached = dataUrlCache.get(url);

  if (cached) {
    return cached;
  }

  const task = (async () => {
    try {
      const response = await fetch(url, { cache: "force-cache" });

      if (!response.ok) {
        return null;
      }

      const blob = await response.blob();
      return await blobToDataUrl(blob);
    } catch {
      return null;
    }
  })();

  dataUrlCache.set(url, task);
  return task;
}

function blobToDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => {
      reject(reader.error ?? new Error("Failed to read the exported asset."));
    };
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("The exported asset could not be converted to a data URL."));
    };

    reader.readAsDataURL(blob);
  });
}

function waitForNextPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

function downloadTextFile(fileName: string, contents: string) {
  const blob = new Blob([contents], {
    type: "text/html;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 0);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
