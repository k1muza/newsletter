"use client";

import { useRef, useEffect, type CSSProperties, type ElementType, type Ref } from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
  editMode: boolean;
  tag?: ElementType;
  className?: string;
  multiline?: boolean;
  style?: CSSProperties;
}

export function EditableText({
  value,
  onChange,
  editMode,
  tag: Tag = "span",
  className = "",
  multiline = true,
  style,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
  }, [value, editMode]);

  if (!editMode) {
    return <Tag className={className} style={style}>{value}</Tag>;
  }

  return (
    <Tag
      ref={ref as Ref<HTMLElement>}
      contentEditable
      suppressContentEditableWarning
      className={`${className} outline-none ring-2 ring-orange-400 ring-offset-1 rounded cursor-text focus:ring-orange-500 transition-shadow`}
      style={style}
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
