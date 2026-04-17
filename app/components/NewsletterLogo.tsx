/* eslint-disable @next/next/no-img-element */
"use client";

import type { ReactNode } from "react";
import type { NewsletterImageAsset } from "@/lib/defaultData";
import { EditableImage } from "./EditableImage";

interface NewsletterLogoProps {
  alt: string;
  className?: string;
  controlsClassName?: string;
  editable?: boolean;
  editMode?: boolean;
  image: NewsletterImageAsset;
  imageClassName?: string;
  onRemove?: () => void;
  onUpload?: (file: File) => Promise<unknown> | unknown;
  placeholder: ReactNode;
  uploading?: boolean;
}

const POSITIONED_CLASSNAME_PATTERN = /\b(?:absolute|fixed|sticky)\b/;

export function NewsletterLogo({
  alt,
  className = "",
  controlsClassName = "",
  editable = false,
  editMode = false,
  image,
  imageClassName = "h-full w-full object-contain",
  onRemove,
  onUpload,
  placeholder,
  uploading = false,
}: NewsletterLogoProps) {
  if (editable && onUpload) {
    return (
      <EditableImage
        alt={alt}
        className={className}
        controlsClassName={controlsClassName}
        editMode={editMode}
        image={image}
        imageClassName={imageClassName}
        onRemove={onRemove}
        onUpload={onUpload}
        placeholder={placeholder}
        uploading={uploading}
      />
    );
  }

  const wrapperClassName = POSITIONED_CLASSNAME_PATTERN.test(className)
    ? className
    : `relative ${className}`.trim();

  return (
    <div className={wrapperClassName}>
      {image.url ? <img alt={alt} className={imageClassName} src={image.url} /> : placeholder}
    </div>
  );
}
