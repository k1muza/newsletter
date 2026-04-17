"use client";

import { EditableText } from "./EditableText";
import { StatCard as StatCardType } from "@/lib/defaultData";

interface Props {
  stat: StatCardType;
  editMode: boolean;
  onChangeValue: (v: string) => void;
  onChangeLabel: (v: string) => void;
}

const colorMap = {
  dark: "bg-gray-900 text-white",
  orange: "bg-orange-500 text-white",
  teal: "bg-teal-500 text-white",
};

export function StatCard({ stat, editMode, onChangeValue, onChangeLabel }: Props) {
  return (
    <div className={`rounded p-[5mm] flex flex-col items-center justify-center text-center min-h-[28mm] ${colorMap[stat.color]}`}>
      <EditableText
        value={stat.value}
        onChange={onChangeValue}
        editMode={editMode}
        tag="p"
        className="text-[18pt] font-black leading-tight mb-1"
        multiline={false}
      />
      <EditableText
        value={stat.label}
        onChange={onChangeLabel}
        editMode={editMode}
        tag="p"
        className="text-[7.5pt] font-semibold opacity-85 leading-snug"
      />
    </div>
  );
}
