"use client";

import { useRef, useEffect, ElementType } from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
  editMode: boolean;
  tag?: ElementType;
  className?: string;
  multiline?: boolean;
}

export function EditableText({ value, onChange, editMode, tag: Tag = "span", className = "", multiline = true }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
  }, [value, editMode]);

  if (!editMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag
      ref={ref as any}
      contentEditable
      suppressContentEditableWarning
      className={`${className} outline-none ring-2 ring-orange-400 ring-offset-1 rounded cursor-text focus:ring-orange-500 transition-shadow`}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        onChange(e.currentTarget.textContent ?? "");
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (!multiline && e.key === "Enter") {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
    />
  );
}
