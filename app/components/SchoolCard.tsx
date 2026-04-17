"use client";

import { School } from "@/lib/defaultData";
import { EditableText } from "./EditableText";
import { EditableList } from "./EditableList";

interface Props {
  school: School;
  editMode: boolean;
  onChangeName: (v: string) => void;
  onChangePoints: (v: string[]) => void;
  onChangeFootnote?: (v: string) => void;
}

const accentMap = {
  dark: { header: "bg-gray-900 text-white", bullet: "bg-orange-500" },
  orange: { header: "bg-orange-500 text-white", bullet: "bg-orange-500" },
  teal: { header: "bg-teal-500 text-white", bullet: "bg-teal-500" },
};

export function SchoolCard({ school, editMode, onChangeName, onChangePoints, onChangeFootnote }: Props) {
  const colors = accentMap[school.accent];
  return (
    <div className="rounded overflow-hidden border border-gray-100">
      <div className={`px-[4mm] py-[2.5mm] ${colors.header}`}>
        <EditableText
          value={school.name}
          onChange={onChangeName}
          editMode={editMode}
          tag="h3"
          className="font-black text-[9pt]"
          multiline={false}
        />
      </div>
      <div className="px-[4mm] py-[3mm] bg-white">
        <EditableList
          items={school.points}
          onChange={onChangePoints}
          editMode={editMode}
          numbered
          bulletColor={colors.bullet}
        />
        {(school.footnote !== undefined) && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <EditableText
              value={school.footnote ?? ""}
              onChange={(v) => onChangeFootnote?.(v)}
              editMode={editMode}
              tag="p"
              className="text-[8pt] text-gray-600 leading-relaxed font-medium italic"
            />
          </div>
        )}
      </div>
    </div>
  );
}
