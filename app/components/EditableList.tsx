"use client";

import { EditableText } from "./EditableText";

interface Props {
  items: string[];
  onChange: (items: string[]) => void;
  editMode: boolean;
  numbered?: boolean;
  itemClassName?: string;
  bulletColor?: string;
}

export function EditableList({ items, onChange, editMode, numbered = false, itemClassName = "", bulletColor = "bg-orange-500" }: Props) {
  const update = (index: number, val: string) => {
    const next = [...items];
    next[index] = val;
    onChange(next);
  };

  const addItem = () => onChange([...items, "New item"]);
  const removeItem = (index: number) => onChange(items.filter((_, i) => i !== index));

  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className={`flex items-start gap-[2.5mm] ${itemClassName}`}>
          {numbered ? (
            <span className={`flex-shrink-0 w-[5mm] h-[5mm] rounded-full ${bulletColor} text-white text-[6.5pt] font-black flex items-center justify-center mt-[1px]`}>
              {i + 1}
            </span>
          ) : (
            <span className={`flex-shrink-0 w-[3mm] h-[3mm] rounded-full ${bulletColor} mt-[4px]`} />
          )}
          <EditableText
            value={item}
            onChange={(val) => update(i, val)}
            editMode={editMode}
            tag="span"
            className="flex-1 text-[9pt] leading-snug"
          />
          {editMode && (
            <button
              onClick={() => removeItem(i)}
              className="screen-only flex-shrink-0 text-red-400 hover:text-red-600 text-[7pt] font-bold"
              title="Remove item"
            >
              ✕
            </button>
          )}
        </li>
      ))}
      {editMode && (
        <li>
          <button
            onClick={addItem}
            className="screen-only text-[8pt] text-orange-500 hover:text-orange-700 font-semibold border border-dashed border-orange-400 rounded px-2 py-0.5 transition-colors"
          >
            + Add item
          </button>
        </li>
      )}
    </ul>
  );
}
