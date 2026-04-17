/* eslint-disable @next/next/no-img-element */
"use client";

import { useId, type ChangeEvent, type ReactNode } from "react";
import type { NewsletterImageAsset } from "@/lib/defaultData";

interface EditableImageProps {
  alt: string;
  children?: ReactNode;
  className?: string;
  controlsClassName?: string;
  editMode: boolean;
  image: NewsletterImageAsset;
  imageClassName?: string;
  onRemove?: () => void;
  onUpload: (file: File) => Promise<unknown> | unknown;
  placeholder: ReactNode;
  uploading?: boolean;
}

export function EditableImage({
  alt,
  children,
  className = "",
  controlsClassName = "",
  editMode,
  image,
  imageClassName = "h-full w-full object-cover",
  onRemove,
  onUpload,
  placeholder,
  uploading = false,
}: EditableImageProps) {
  const inputId = useId();

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    await onUpload(file);
    event.target.value = "";
  }

  return (
    <div className={/\b(?:absolute|fixed|sticky)\b/.test(className) ? className : `relative ${className}`}>
      {image.url ? <img alt={alt} className={imageClassName} src={image.url} /> : placeholder}
      {children}

      {editMode ? (
        <div
          className={`screen-only absolute right-3 top-3 z-20 flex items-center gap-2 ${controlsClassName}`}
        >
          <label
            className="cursor-pointer rounded-full bg-black/75 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.22em] text-white shadow-sm transition hover:bg-black"
            htmlFor={inputId}
          >
            {image.url ? "Replace" : "Upload"}
          </label>
          <input
            accept="image/*"
            className="hidden"
            disabled={uploading}
            id={inputId}
            onChange={handleFileChange}
            type="file"
          />
          {image.url && onRemove ? (
            <button
              className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.22em] text-white transition hover:bg-white/20"
              onClick={onRemove}
              type="button"
            >
              Remove
            </button>
          ) : null}
        </div>
      ) : null}

      {uploading ? (
        <div className="screen-only absolute inset-0 z-10 flex items-center justify-center bg-black/45 backdrop-blur-[2px]">
          <div className="rounded-full border border-white/20 bg-black/60 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white">
            Uploading...
          </div>
        </div>
      ) : null}
    </div>
  );
}
