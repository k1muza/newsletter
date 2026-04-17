"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useNewsletterData } from "@/hooks/useNewsletterData";
import type { NewsletterSlug } from "@/lib/newsletterDesigns";
import { EditableImage } from "./EditableImage";
import { EditableText } from "./EditableText";
import { PageFooter } from "./PageShell";

const FOREST = "#173f35";
const FOREST_DEEP = "#0d2a23";
const MOSS = "#2d6a4f";
const CLAY = "#c96f4d";
const AMBER = "#d8a13f";
const SAND = "#f4ede3";
const PAPER = "#fffaf3";
const INK = "#1f2933";
const INK_MID = "#52606d";
const INK_LIGHT = "#7b8794";
const HEADING_FONT = 'Georgia, "Times New Roman", serif';

interface NewsletterResilienceProps {
  newsletterSlug: NewsletterSlug;
}

export default function NewsletterResilience({
  newsletterSlug,
}: NewsletterResilienceProps) {
  const {
    clearImage,
    data,
    editMode,
    errorMessage,
    isUploading,
    loaded,
    resetToDefault,
    saveState,
    setEditMode,
    updateField,
    uploadImage,
  } = useNewsletterData(newsletterSlug);

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-100">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"
          style={{ borderColor: `${CLAY} transparent ${CLAY} ${CLAY}` }}
        />
      </div>
    );
  }

  const e = editMode;
  const badge = getSyncBadge(saveState, errorMessage);
  const org = data.meta.organizationName;
  const storyQuote =
    data.beneficiaryStory.paragraphs[data.beneficiaryStory.paragraphs.length - 1] ?? "";
  const storyBody = data.beneficiaryStory.paragraphs.slice(
    0,
    Math.max(data.beneficiaryStory.paragraphs.length - 1, 0)
  );

  function updateListItem(path: string, list: string[], index: number, value: string) {
    const next = list.map((item, itemIndex) => (itemIndex === index ? value : item));
    updateField(path, next);
  }

  function updateStat(
    field: "scholarship" | "innovationProgress",
    index: number,
    key: "value" | "label",
    value: string
  ) {
    const next = data[field].stats.map((stat, statIndex) =>
      statIndex === index ? { ...stat, [key]: value } : stat
    );
    updateField(`${field}.stats`, next);
  }

  function updateSchoolField(
    field: "schoolImpact" | "keyDevelopments",
    schoolIndex: number,
    key: "name" | "footnote",
    value: string
  ) {
    const next = data[field].schools.map((school, index) =>
      index === schoolIndex ? { ...school, [key]: value } : school
    );
    updateField(`${field}.schools`, next);
  }

  function updateSchoolPoint(
    field: "schoolImpact" | "keyDevelopments",
    schoolIndex: number,
    pointIndex: number,
    value: string
  ) {
    const next = data[field].schools.map((school, index) =>
      index === schoolIndex
        ? {
            ...school,
            points: school.points.map((point, innerIndex) =>
              innerIndex === pointIndex ? value : point
            ),
          }
        : school
    );
    updateField(`${field}.schools`, next);
  }

  return (
    <>
      <div
        className="screen-only fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-2 text-xs font-semibold"
        style={{ background: FOREST_DEEP, color: "rgba(255,255,255,0.88)" }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] transition"
            style={{
              borderColor: "rgba(255,255,255,0.14)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            ← Newsletters
          </Link>
          <span style={{ color: "rgba(255,255,255,0.5)" }}>
            Rural Resilience · {data.meta.year}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] ${badge.cls}`}
            title={errorMessage ?? undefined}
          >
            {badge.label}
          </span>
          {editMode ? (
            <button
              type="button"
              onClick={resetToDefault}
              className="transition-colors"
              style={{ color: "#f7c88d" }}
            >
              Reset defaults
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setEditMode(!e)}
            className="rounded-full px-4 py-1.5 text-xs font-bold transition-all"
            style={
              editMode
                ? { background: CLAY, color: "#fff" }
                : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.86)" }
            }
          >
            {editMode ? "Done editing" : "Edit content"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full px-4 py-1.5 text-xs font-bold transition-colors"
            style={{ background: "#fff", color: FOREST_DEEP }}
          >
            Save as PDF
          </button>
        </div>
      </div>

      <div className={`pb-12 ${editMode ? "bg-orange-50" : "bg-stone-200"}`}>
        <div className="page" style={{ background: FOREST_DEEP }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at top left, rgba(216,161,63,0.14), transparent 24%), radial-gradient(circle at 82% 18%, rgba(201,111,77,0.2), transparent 20%), linear-gradient(145deg, rgba(13,42,35,0.98), rgba(23,63,53,0.94))",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-[4mm]" style={{ background: CLAY }} />
          <div
            className="absolute -right-[28mm] top-[18mm] h-[110mm] w-[110mm] rounded-full"
            style={{ background: "rgba(216,161,63,0.08)" }}
          />
          <div
            className="absolute bottom-[-26mm] left-[-18mm] h-[104mm] w-[104mm] rounded-full"
            style={{ background: "rgba(201,111,77,0.1)" }}
          />

          <div
            className="absolute right-[18mm] top-[54mm] h-[146mm] w-[78mm] rounded-[36mm] border"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          />
          <div
            className="absolute right-[28mm] top-[72mm] h-[118mm] w-[52mm] rounded-[28mm]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,250,243,0.95), rgba(244,237,227,0.76))",
              boxShadow: "0 30px 60px rgba(7,19,16,0.2)",
            }}
          />
          <div
            className="absolute right-[66mm] top-[86mm] h-[20mm] w-[20mm] rounded-full border"
            style={{ borderColor: "rgba(255,255,255,0.18)" }}
          />
          <div
            className="absolute right-[14mm] top-[142mm] h-[30mm] w-[30mm] rounded-full"
            style={{ background: "rgba(201,111,77,0.82)" }}
          />
          <div
            className="absolute right-[54mm] bottom-[22mm] h-[40mm] w-[40mm] rounded-full border"
            style={{ borderColor: "rgba(247,200,141,0.26)" }}
          />
          <div
            className="absolute inset-0 px-[14mm] pb-[16mm] pt-[18mm]"
            style={{ background: "linear-gradient(90deg, rgba(13,42,35,0.16), transparent 58%)" }}
          >
            <div className="flex items-start justify-between gap-[8mm]">
              <div className="flex items-center gap-4">
                <EditableImage
                  alt={`${data.meta.organizationName} logo`}
                  className="h-[18mm] w-[44mm]"
                  controlsClassName="right-0 top-0"
                  editMode={e}
                  image={data.meta.logo}
                  imageClassName="h-full w-full object-contain"
                  onRemove={() => clearImage("meta.logo")}
                  onUpload={(file) => uploadImage("meta.logo", file)}
                  placeholder={
                    <div
                      className="flex h-full w-full items-center justify-center rounded-[5mm] border text-[8pt] font-black uppercase tracking-[0.34em] text-white"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        borderColor: "rgba(255,255,255,0.1)",
                      }}
                    >
                      TTI
                    </div>
                  }
                  uploading={isUploading("meta.logo")}
                />
                <EditableText
                  value={data.meta.organizationName}
                  onChange={(value) => updateField("meta.organizationName", value)}
                  editMode={e}
                  tag="p"
                  multiline={false}
                  className="max-w-[74mm] text-[7.4pt] font-black uppercase tracking-[0.34em]"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                />
              </div>

              <div
                className="rounded-full border px-4 py-2 text-[6.4pt] font-black uppercase tracking-[0.3em]"
                style={{
                  borderColor: "rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <EditableText
                  value={data.meta.quarter}
                  onChange={(value) => updateField("meta.quarter", value)}
                  editMode={e}
                  tag="span"
                  multiline={false}
                />
                {" • "}
                <EditableText
                  value={data.meta.year}
                  onChange={(value) => updateField("meta.year", value)}
                  editMode={e}
                  tag="span"
                  multiline={false}
                />
              </div>
            </div>

            <div className="flex h-[calc(100%-18mm)] flex-col justify-center pb-[8mm]">
              <div className="max-w-[100mm]">
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-[1px] w-[12mm]" style={{ background: CLAY }} />
                    <EditableText
                      value={data.meta.coverEyebrow}
                      onChange={(value) => updateField("meta.coverEyebrow", value)}
                      editMode={e}
                      tag="p"
                      multiline={false}
                      className="text-[6.8pt] font-black uppercase tracking-[0.34em]"
                      style={{ color: "#f7c88d" }}
                    />
                  </div>

                  <EditableText
                    value={data.meta.newsletterTitleLead}
                    onChange={(value) => updateField("meta.newsletterTitleLead", value)}
                    editMode={e}
                    tag="h1"
                    multiline={false}
                    className="max-w-[96mm] text-[50pt] font-black leading-[0.88] tracking-[-0.05em]"
                    style={{ color: "#fffaf3", fontFamily: HEADING_FONT }}
                  />
                  <EditableText
                    value={data.meta.newsletterTitleAccent}
                    onChange={(value) => updateField("meta.newsletterTitleAccent", value)}
                    editMode={e}
                    tag="h1"
                    multiline={false}
                    className="mt-1 max-w-[96mm] text-[50pt] font-black leading-[0.88] tracking-[-0.05em]"
                    style={{ color: "#f7c88d", fontFamily: HEADING_FONT }}
                  />

                  <EditableText
                    value={data.meta.tagline}
                    onChange={(value) => updateField("meta.tagline", value)}
                    editMode={e}
                    tag="p"
                    multiline={false}
                    className="mt-6 max-w-[74mm] text-[8.1pt] font-semibold uppercase tracking-[0.3em]"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  />

                </div>
              </div>

              <div className="mt-auto flex items-end justify-between gap-[8mm]">
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-[24mm]" style={{ background: "rgba(255,255,255,0.16)" }} />
                  <div className="h-[6px] w-[6px] rounded-full" style={{ background: CLAY }} />
                  <div className="h-[1px] w-[36mm]" style={{ background: "rgba(247,200,141,0.22)" }} />
                </div>

                <div
                  className="rounded-full border px-4 py-2 text-[6pt] font-black uppercase tracking-[0.3em]"
                  style={{
                    borderColor: "rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.04)",
                    color: "#f7c88d",
                  }}
                >
                  Resilience Edition
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page" style={{ background: SAND }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at top left, rgba(217,161,63,0.22), transparent 24%), radial-gradient(circle at top right, rgba(45,106,79,0.14), transparent 24%), linear-gradient(160deg, rgba(255,250,243,0.92), rgba(244,237,227,0.95))",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-[4mm]" style={{ background: CLAY }} />
          <div
            className="absolute -right-[18mm] top-[16mm] h-[92mm] w-[92mm] rounded-full"
            style={{ background: "rgba(45,106,79,0.14)" }}
          />
          <div
            className="absolute right-[10mm] top-[24mm] h-[46mm] w-[46mm] rounded-full"
            style={{ background: "rgba(201,111,77,0.16)" }}
          />
          <div
            className="absolute bottom-[-18mm] left-[-20mm] h-[96mm] w-[96mm] rounded-full"
            style={{ background: "rgba(216,161,63,0.12)" }}
          />

          <div className="absolute inset-0 grid grid-cols-[1.08fr_0.92fr] gap-[10mm] px-[14mm] pb-[14mm] pt-[18mm]">
            <div className="flex flex-col">
              <div className="mb-8 flex items-center gap-3">
                <div
                  className="flex h-[11mm] w-[11mm] items-center justify-center rounded-full text-[8pt] font-black text-white"
                  style={{ background: FOREST_DEEP }}
                >
                  TTI
                </div>
                <EditableText
                  value={data.meta.organizationName}
                  onChange={(value) => updateField("meta.organizationName", value)}
                  editMode={e}
                  tag="span"
                  multiline={false}
                  className="text-[7.8pt] font-black uppercase tracking-[0.34em]"
                  style={{ color: "rgba(23,63,53,0.74)" }}
                />
              </div>

              <div className="mb-5 flex items-center gap-3">
                <div className="h-[1px] w-[12mm]" style={{ background: CLAY }} />
                <p
                  className="text-[7pt] font-black uppercase tracking-[0.34em]"
                  style={{ color: CLAY }}
                >
                  Editorial Edition
                </p>
              </div>

              <EditableText
                value={data.meta.newsletterTitleLead}
                onChange={(value) => updateField("meta.newsletterTitleLead", value)}
                editMode={e}
                tag="h1"
                multiline={false}
                className="max-w-[88mm] text-[39pt] font-black leading-[0.92] tracking-[-0.04em]"
                style={{ color: FOREST_DEEP, fontFamily: HEADING_FONT }}
              />
              <EditableText
                value={data.meta.newsletterTitleAccent}
                onChange={(value) => updateField("meta.newsletterTitleAccent", value)}
                editMode={e}
                tag="h1"
                multiline={false}
                className="mt-1 max-w-[88mm] text-[39pt] font-black leading-[0.92] tracking-[-0.04em]"
                style={{ color: CLAY, fontFamily: HEADING_FONT }}
              />

              <EditableText
                value={data.meta.tagline}
                onChange={(value) => updateField("meta.tagline", value)}
                editMode={e}
                tag="p"
                multiline={false}
                className="mt-5 max-w-[86mm] text-[9pt] font-semibold uppercase tracking-[0.3em]"
                style={{ color: "rgba(23,63,53,0.6)" }}
              />

              <div className="mt-8 flex items-center gap-3">
                <div className="h-[2px] w-[16mm]" style={{ background: FOREST_DEEP }} />
                <div className="h-[4px] w-[4px] rounded-full" style={{ background: AMBER }} />
                <div className="h-[2px] flex-1" style={{ background: "rgba(23,63,53,0.12)" }} />
              </div>

              <div className="mt-8 space-y-4">
                <EditableText
                  value={data.hero.intro}
                  onChange={(value) => updateField("hero.intro", value)}
                  editMode={e}
                  tag="p"
                  className="max-w-[92mm] text-[10pt] font-semibold leading-relaxed"
                  style={{ color: INK }}
                />
                <EditableText
                  value={data.hero.body1}
                  onChange={(value) => updateField("hero.body1", value)}
                  editMode={e}
                  tag="p"
                  className="max-w-[92mm] text-[8.6pt] leading-relaxed"
                  style={{ color: INK_MID }}
                />
                <EditableText
                  value={data.hero.body2}
                  onChange={(value) => updateField("hero.body2", value)}
                  editMode={e}
                  tag="p"
                  className="max-w-[92mm] text-[8.4pt] leading-relaxed"
                  style={{ color: INK_LIGHT }}
                />
              </div>

              <div className="mt-auto flex items-center gap-3 pt-[10mm]">
                <div className="h-[10mm] w-[1px]" style={{ background: CLAY }} />
                <div>
                  <p
                    className="mb-1 text-[6.4pt] font-black uppercase tracking-[0.3em]"
                    style={{ color: INK_LIGHT }}
                  >
                    Prepared by
                  </p>
                  <EditableText
                    value={data.meta.preparedBy}
                    onChange={(value) => updateField("meta.preparedBy", value)}
                    editMode={e}
                    tag="p"
                    multiline={false}
                    className="text-[9.2pt] font-bold"
                    style={{ color: FOREST_DEEP }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[4mm] pt-[8mm]">
              <div
                className="rounded-[6mm] border px-[6mm] py-[6mm]"
                style={{
                  background: "rgba(255,255,255,0.76)",
                  borderColor: "rgba(23,63,53,0.08)",
                  boxShadow: "0 22px 55px rgba(23,63,53,0.08)",
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p
                      className="text-[6.5pt] font-black uppercase tracking-[0.3em]"
                      style={{ color: "rgba(23,63,53,0.52)" }}
                    >
                      Report Window
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <EditableText
                        value={data.meta.quarter}
                        onChange={(value) => updateField("meta.quarter", value)}
                        editMode={e}
                        tag="span"
                        multiline={false}
                        className="text-[14pt] font-black"
                        style={{ color: FOREST_DEEP, fontFamily: HEADING_FONT }}
                      />
                      <span style={{ color: "rgba(23,63,53,0.3)" }}>·</span>
                      <EditableText
                        value={data.meta.year}
                        onChange={(value) => updateField("meta.year", value)}
                        editMode={e}
                        tag="span"
                        multiline={false}
                        className="text-[14pt] font-black"
                        style={{ color: CLAY, fontFamily: HEADING_FONT }}
                      />
                    </div>
                  </div>
                  <div
                    className="rounded-full px-3 py-1 text-[6.2pt] font-black uppercase tracking-[0.28em]"
                    style={{ background: "rgba(201,111,77,0.12)", color: CLAY }}
                  >
                    Rural Momentum
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-[3mm]">
                  {data.scholarship.stats.map((stat, index) => (
                    <div
                      key={index}
                      className="rounded-[4mm] border px-[4mm] py-[4mm]"
                      style={{
                        background:
                          index % 2 === 0 ? "rgba(23,63,53,0.04)" : "rgba(201,111,77,0.06)",
                        borderColor: "rgba(23,63,53,0.08)",
                      }}
                    >
                      <EditableText
                        value={stat.value}
                        onChange={(value) => updateStat("scholarship", index, "value", value)}
                        editMode={e}
                        tag="p"
                        multiline={false}
                        className="text-[18pt] font-black leading-none"
                        style={{
                          color: index === 1 ? CLAY : index === 2 ? MOSS : FOREST_DEEP,
                          fontFamily: HEADING_FONT,
                        }}
                      />
                      <EditableText
                        value={stat.label}
                        onChange={(value) => updateStat("scholarship", index, "label", value)}
                        editMode={e}
                        tag="p"
                        className="mt-2 text-[6.8pt] font-medium leading-snug"
                        style={{ color: INK_MID }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="rounded-[6mm] border px-[6mm] py-[6mm]"
                style={{
                  background: FOREST_DEEP,
                  borderColor: "rgba(255,255,255,0.06)",
                  boxShadow: "0 24px 50px rgba(13,42,35,0.26)",
                }}
              >
                <p
                  className="mb-3 text-[6.5pt] font-black uppercase tracking-[0.3em]"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  Why It Matters
                </p>
                <EditableText
                  value={data.about.purpose}
                  onChange={(value) => updateField("about.purpose", value)}
                  editMode={e}
                  tag="p"
                  className="text-[8pt] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.78)" }}
                />
              </div>
            </div>
          </div>

          <PageFooter organizationName={org} pageNum={1} section="Opening Brief" />
        </div>

        <div className="page" style={{ background: PAPER }}>
          <div className="absolute inset-x-0 top-0 h-[3mm]" style={{ background: FOREST_DEEP }} />
          <div
            className="absolute right-[-18mm] top-[18mm] h-[70mm] w-[70mm] rounded-full"
            style={{ background: "rgba(216,161,63,0.12)" }}
          />
          <div className="page-content">
            <PageIntro
              eyebrow="Foundations"
              title="Purpose, practice, and vision"
              subtitle="The platform behind TTI's long-term approach to education and community resilience."
            />

            <div className="grid grid-cols-[1.1fr_0.9fr] gap-[6mm]">
              <div className="space-y-[4mm]">
                <PaperPanel
                  accent={CLAY}
                  background="linear-gradient(180deg, rgba(201,111,77,0.08), rgba(255,255,255,0.95))"
                >
                  <PanelLabel label="Our Purpose" tone={CLAY} />
                  <EditableText
                    value={data.about.purpose}
                    onChange={(value) => updateField("about.purpose", value)}
                    editMode={e}
                    tag="p"
                    className="text-[8.2pt] leading-relaxed"
                    style={{ color: INK }}
                  />
                </PaperPanel>

                <PaperPanel accent={FOREST_DEEP}>
                  <PanelLabel label="What We Do" tone={FOREST_DEEP} />
                  <EditableText
                    value={data.about.whatWeDoIntro}
                    onChange={(value) => updateField("about.whatWeDoIntro", value)}
                    editMode={e}
                    tag="p"
                    className="mb-4 text-[8pt] leading-relaxed"
                    style={{ color: INK_MID }}
                  />
                  <div className="grid grid-cols-2 gap-[3mm]">
                    {data.about.whatWeDoItems.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-[4mm] border px-[3.5mm] py-[3mm]"
                        style={{
                          background: index % 2 === 0 ? "rgba(23,63,53,0.035)" : "rgba(216,161,63,0.08)",
                          borderColor: "rgba(23,63,53,0.08)",
                        }}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <div className="h-[5px] w-[5px] rounded-full" style={{ background: index % 2 === 0 ? FOREST_DEEP : CLAY }} />
                          <span
                            className="text-[6pt] font-black uppercase tracking-[0.26em]"
                            style={{ color: INK_LIGHT }}
                          >
                            Action {index + 1}
                          </span>
                        </div>
                        <EditableText
                          value={item}
                          onChange={(value) => updateListItem("about.whatWeDoItems", data.about.whatWeDoItems, index, value)}
                          editMode={e}
                          tag="p"
                          className="text-[7.2pt] leading-snug"
                          style={{ color: INK_MID }}
                        />
                      </div>
                    ))}
                  </div>
                </PaperPanel>
              </div>

              <div className="space-y-[4mm]">
                <PaperPanel
                  accent={AMBER}
                  background="linear-gradient(180deg, rgba(216,161,63,0.12), rgba(255,255,255,0.96))"
                >
                  <PanelLabel label="Our Vision" tone={AMBER} />
                  <EditableText
                    value={data.about.vision}
                    onChange={(value) => updateField("about.vision", value)}
                    editMode={e}
                    tag="p"
                    className="text-[8.2pt] leading-relaxed"
                    style={{ color: INK }}
                  />
                </PaperPanel>

                <PaperPanel
                  accent={MOSS}
                  background="linear-gradient(180deg, rgba(45,106,79,0.09), rgba(255,255,255,0.95))"
                >
                  <PanelLabel label="Our Goal" tone={MOSS} />
                  <EditableText
                    value={data.about.goal}
                    onChange={(value) => updateField("about.goal", value)}
                    editMode={e}
                    tag="p"
                    className="text-[8pt] leading-relaxed"
                    style={{ color: INK_MID }}
                  />
                </PaperPanel>

                <PaperPanel accent={FOREST_DEEP} background={FOREST_DEEP}>
                  <PanelLabel label="Operating Lens" tone="#ffffff" muted />
                  <div className="space-y-3">
                    {data.selfSustaining.focusAreas.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-[4mm] border px-[4mm] py-[3mm]"
                        style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.05)" }}
                      >
                        <EditableText
                          value={item}
                          onChange={(value) =>
                            updateListItem(
                              "selfSustaining.focusAreas",
                              data.selfSustaining.focusAreas,
                              index,
                              value
                            )
                          }
                          editMode={e}
                          tag="p"
                          className="text-[7.4pt] leading-snug"
                          style={{ color: "rgba(255,255,255,0.76)" }}
                        />
                      </div>
                    ))}
                  </div>
                </PaperPanel>
              </div>
            </div>
          </div>

          <PageFooter organizationName={org} pageNum={2} section="Purpose & Vision" />
        </div>

        <div className="page" style={{ background: FOREST_DEEP }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(216,161,63,0.18), transparent 25%), radial-gradient(circle at bottom left, rgba(201,111,77,0.16), transparent 30%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-[4mm]" style={{ background: AMBER }} />
          <div className="page-content">
            <PageIntro
              eyebrow="Executive Summary"
              title="What moved this quarter"
              subtitle="Scholarship growth, school-led infrastructure, and basic learning support continued to expand together."
              light
            />

            <div className="grid grid-cols-[1.15fr_0.85fr] gap-[6mm]">
              <div className="space-y-[4mm]">
                <DarkPanel>
                  <PanelLabel label="Report Summary" tone={AMBER} muted />
                  <EditableText
                    value={data.executiveSummary.body1}
                    onChange={(value) => updateField("executiveSummary.body1", value)}
                    editMode={e}
                    tag="p"
                    className="mb-4 text-[8.1pt] leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.82)" }}
                  />
                  <EditableText
                    value={data.executiveSummary.body2}
                    onChange={(value) => updateField("executiveSummary.body2", value)}
                    editMode={e}
                    tag="p"
                    className="text-[8.1pt] leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.72)" }}
                  />
                </DarkPanel>

                <DarkPanel>
                  <PanelLabel label="Key Takeaways" tone={CLAY} muted />
                  <div className="space-y-3">
                    {data.executiveSummary.points.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div
                          className="mt-[4px] h-[6px] w-[6px] shrink-0 rounded-full"
                          style={{ background: index === 1 ? CLAY : AMBER }}
                        />
                        <EditableText
                          value={item}
                          onChange={(value) =>
                            updateListItem(
                              "executiveSummary.points",
                              data.executiveSummary.points,
                              index,
                              value
                            )
                          }
                          editMode={e}
                          tag="p"
                          className="text-[7.8pt] leading-snug"
                          style={{ color: "rgba(255,255,255,0.76)" }}
                        />
                      </div>
                    ))}
                  </div>
                </DarkPanel>
              </div>

              <div className="space-y-[4mm]">
                <div
                  className="rounded-[6mm] border px-[6mm] py-[6mm]"
                  style={{
                    background: "rgba(255,250,243,0.95)",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                >
                  <PanelLabel label="Scholarship Snapshot" tone={FOREST_DEEP} />
                  <EditableText
                    value={data.scholarship.description}
                    onChange={(value) => updateField("scholarship.description", value)}
                    editMode={e}
                    tag="p"
                    className="mb-4 text-[7.8pt] leading-relaxed"
                    style={{ color: INK_MID }}
                  />
                  <div className="grid gap-[3mm]">
                    {data.scholarship.stats.map((stat, index) => (
                      <div
                        key={index}
                        className="rounded-[4mm] border px-[4mm] py-[3.5mm]"
                        style={{
                          background:
                            index === 0
                              ? "rgba(23,63,53,0.05)"
                              : index === 1
                                ? "rgba(216,161,63,0.08)"
                                : index === 2
                                  ? "rgba(45,106,79,0.08)"
                                  : "rgba(201,111,77,0.08)",
                          borderColor: "rgba(23,63,53,0.08)",
                        }}
                      >
                        <EditableText
                          value={stat.value}
                          onChange={(value) => updateStat("scholarship", index, "value", value)}
                          editMode={e}
                          tag="p"
                          multiline={false}
                          className="text-[16pt] font-black leading-none"
                          style={{
                            color:
                              index === 0
                                ? FOREST_DEEP
                                : index === 1
                                  ? AMBER
                                  : index === 2
                                    ? MOSS
                                    : CLAY,
                            fontFamily: HEADING_FONT,
                          }}
                        />
                        <EditableText
                          value={stat.label}
                          onChange={(value) => updateStat("scholarship", index, "label", value)}
                          editMode={e}
                          tag="p"
                          className="mt-2 text-[6.8pt] leading-snug"
                          style={{ color: INK_MID }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <DarkPanel>
                  <PanelLabel label="Learning Support" tone={AMBER} muted />
                  <p
                    className="mb-3 text-[14pt] font-black leading-none"
                    style={{ color: "#fff", fontFamily: HEADING_FONT }}
                  >
                    1,000 learners
                  </p>
                  <p
                    className="text-[7.6pt] leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.72)" }}
                  >
                    Notebooks, pens, and backpacks were distributed to help students move through
                    the 2026 academic year with essential learning materials already in hand.
                  </p>
                </DarkPanel>
              </div>
            </div>
          </div>

          <PageFooter organizationName={org} pageNum={3} section="Executive Summary" theme="dark" />
        </div>

        <div className="page" style={{ background: PAPER }}>
          <div className="absolute inset-x-0 top-0 h-[3mm]" style={{ background: CLAY }} />
          <div className="page-content">
            <PageIntro
              eyebrow="A compelling and inspiring story"
              title="Learnmore Marandu"
              subtitle="A story of care, resilience, and educational possibility."
            />

            <div className="grid grid-cols-[58mm_1fr] gap-[7mm]">
              <div className="space-y-[4mm]">
                <EditableImage
                  alt={`${data.beneficiaryStory.name} portrait`}
                  className="overflow-hidden rounded-[6mm]"
                  editMode={e}
                  image={data.beneficiaryStory.image}
                  imageClassName="h-full w-full object-cover"
                  onRemove={() => clearImage("beneficiaryStory.image")}
                  onUpload={(file) => uploadImage("beneficiaryStory.image", file)}
                  placeholder={
                    <div
                      className="flex aspect-[4/5] w-full flex-col items-center justify-center px-[5mm] text-center"
                      style={{
                        background:
                          "linear-gradient(160deg, rgba(23,63,53,0.96), rgba(45,106,79,0.88))",
                      }}
                    >
                      <div
                        className="mb-3 rounded-full border px-3 py-1 text-[6.4pt] font-black uppercase tracking-[0.28em]"
                        style={{
                          borderColor: "rgba(255,255,255,0.16)",
                          color: "rgba(255,255,255,0.56)",
                        }}
                      >
                        Story Portrait
                      </div>
                      <EditableText
                        value={data.beneficiaryStory.name}
                        onChange={(value) => updateField("beneficiaryStory.name", value)}
                        editMode={e}
                        tag="p"
                        multiline={false}
                        className="text-[15pt] font-black"
                        style={{ color: "#fff", fontFamily: HEADING_FONT }}
                      />
                    </div>
                  }
                  uploading={isUploading("beneficiaryStory.image")}
                />

                <PaperPanel
                  accent={FOREST_DEEP}
                  background="linear-gradient(180deg, rgba(23,63,53,0.06), rgba(255,255,255,0.96))"
                >
                  <PanelLabel label="Current Chapter" tone={FOREST_DEEP} />
                  <p
                    className="text-[7.4pt] leading-relaxed"
                    style={{ color: INK_MID }}
                  >
                    Learnmore is currently pursuing a Bachelor&apos;s degree in Peace and Governance at
                    Bindura University while building a brighter future for herself and her child.
                  </p>
                </PaperPanel>

                <div
                  className="rounded-[6mm] px-[5mm] py-[5mm]"
                  style={{ background: FOREST_DEEP, boxShadow: "0 22px 45px rgba(13,42,35,0.22)" }}
                >
                  <div
                    className="mb-2 text-[24pt] font-black leading-none"
                    style={{ color: AMBER, fontFamily: HEADING_FONT }}
                  >
                    &quot;
                  </div>
                  <EditableText
                    value={storyQuote}
                    onChange={(value) =>
                      updateListItem(
                        "beneficiaryStory.paragraphs",
                        data.beneficiaryStory.paragraphs,
                        data.beneficiaryStory.paragraphs.length - 1,
                        value
                      )
                    }
                    editMode={e}
                    tag="p"
                    className="text-[8pt] font-medium italic leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.82)" }}
                  />
                </div>
              </div>

              <div className="rounded-[6mm] border px-[6mm] py-[6mm]" style={{ borderColor: "rgba(23,63,53,0.08)" }}>
                <EditableText
                  value={data.beneficiaryStory.name}
                  onChange={(value) => updateField("beneficiaryStory.name", value)}
                  editMode={e}
                  tag="h3"
                  multiline={false}
                  className="mb-4 text-[20pt] font-black leading-none"
                  style={{ color: FOREST_DEEP, fontFamily: HEADING_FONT }}
                />
                <div className="space-y-4">
                  {storyBody.map((paragraph, index) => (
                    <EditableText
                      key={index}
                      value={paragraph}
                      onChange={(value) =>
                        updateListItem(
                          "beneficiaryStory.paragraphs",
                          data.beneficiaryStory.paragraphs,
                          index,
                          value
                        )
                      }
                      editMode={e}
                      tag="p"
                      className="text-[8.1pt] leading-relaxed"
                      style={{ color: index === 0 ? INK : INK_MID }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <PageFooter organizationName={org} pageNum={4} section="Beneficiary Story" />
        </div>

        <div className="page" style={{ background: SAND }}>
          <div className="absolute inset-x-0 top-0 h-[3mm]" style={{ background: AMBER }} />
          <div className="page-content">
            <PageIntro
              eyebrow="Self-sustaining schools"
              title="Why TTI builds models that can keep going"
              subtitle="The work is designed to help schools reduce dependency, generate income, and reinvest in learning."
            />

            <div className="grid grid-cols-[1.02fr_0.98fr] gap-[6mm]">
              <PaperPanel
                accent={FOREST_DEEP}
                background="linear-gradient(180deg, rgba(23,63,53,0.05), rgba(255,255,255,0.96))"
              >
                <PanelLabel label="Why this model matters" tone={FOREST_DEEP} />
                <EditableText
                  value={data.selfSustaining.description}
                  onChange={(value) => updateField("selfSustaining.description", value)}
                  editMode={e}
                  tag="p"
                  className="mb-4 text-[8pt] leading-relaxed"
                  style={{ color: INK_MID }}
                />
                <div className="grid grid-cols-3 gap-[3mm]">
                  {data.selfSustaining.focusAreas.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-[4mm] border px-[3mm] py-[3mm]"
                      style={{
                        borderColor: "rgba(23,63,53,0.08)",
                        background: index === 1 ? "rgba(201,111,77,0.08)" : "rgba(255,255,255,0.9)",
                      }}
                    >
                      <EditableText
                        value={item}
                        onChange={(value) =>
                          updateListItem(
                            "selfSustaining.focusAreas",
                            data.selfSustaining.focusAreas,
                            index,
                            value
                          )
                        }
                        editMode={e}
                        tag="p"
                        className="text-[6.8pt] leading-snug"
                        style={{ color: INK_MID }}
                      />
                    </div>
                  ))}
                </div>
              </PaperPanel>

              <div
                className="rounded-[6mm] px-[6mm] py-[6mm]"
                style={{ background: FOREST_DEEP, boxShadow: "0 24px 48px rgba(13,42,35,0.2)" }}
              >
                <PanelLabel label="Current progress" tone={AMBER} muted />
                <div className="space-y-4">
                  {data.selfSustaining.progress.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className="mt-[4px] h-[6px] w-[6px] shrink-0 rounded-full"
                        style={{ background: index === 0 ? AMBER : CLAY }}
                      />
                      <EditableText
                        value={item}
                        onChange={(value) =>
                          updateListItem("selfSustaining.progress", data.selfSustaining.progress, index, value)
                        }
                        editMode={e}
                        tag="p"
                        className="text-[8pt] leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.76)" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-[5mm] grid grid-cols-2 gap-[4mm]">
              {data.schoolImpact.schools.slice(0, 2).map((school, schoolIndex) => (
                <PaperPanel
                  key={schoolIndex}
                  accent={schoolIndex === 0 ? FOREST_DEEP : CLAY}
                  background={
                    schoolIndex === 0
                      ? "linear-gradient(180deg, rgba(23,63,53,0.05), rgba(255,255,255,0.98))"
                      : "linear-gradient(180deg, rgba(201,111,77,0.08), rgba(255,255,255,0.98))"
                  }
                >
                  <EditableText
                    value={school.name}
                    onChange={(value) => updateSchoolField("schoolImpact", schoolIndex, "name", value)}
                    editMode={e}
                    tag="h3"
                    multiline={false}
                    className="mb-4 text-[14pt] font-black leading-tight"
                    style={{
                      color: schoolIndex === 0 ? FOREST_DEEP : CLAY,
                      fontFamily: HEADING_FONT,
                    }}
                  />
                  <div className="space-y-3">
                    {school.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start gap-3">
                        <div
                          className="mt-[4px] h-[6px] w-[6px] shrink-0 rounded-full"
                          style={{ background: schoolIndex === 0 ? FOREST_DEEP : CLAY }}
                        />
                        <EditableText
                          value={point}
                          onChange={(value) =>
                            updateSchoolPoint("schoolImpact", schoolIndex, pointIndex, value)
                          }
                          editMode={e}
                          tag="p"
                          className="text-[7.5pt] leading-snug"
                          style={{ color: INK_MID }}
                        />
                      </div>
                    ))}
                  </div>
                </PaperPanel>
              ))}
            </div>
          </div>

          <PageFooter organizationName={org} pageNum={5} section="Self-Sustaining Schools" />
        </div>

        <div className="page" style={{ background: PAPER }}>
          <div className="absolute inset-x-0 top-0 h-[3mm]" style={{ background: MOSS }} />
          <div className="page-content">
            <PageIntro
              eyebrow="School stories and innovation"
              title="From revived gardens to stronger learning spaces"
              subtitle="Matau's turnaround and TTI's innovation strategy show how the model scales across different needs."
            />

            <div className="grid grid-cols-[1.02fr_0.98fr] gap-[5mm]">
              <PaperPanel
                accent={CLAY}
                background="linear-gradient(180deg, rgba(201,111,77,0.08), rgba(255,255,255,0.98))"
              >
                <EditableText
                  value={data.schoolImpact.schools[2]?.name ?? ""}
                  onChange={(value) => updateSchoolField("schoolImpact", 2, "name", value)}
                  editMode={e}
                  tag="h3"
                  multiline={false}
                  className="mb-4 text-[16pt] font-black leading-tight"
                  style={{ color: CLAY, fontFamily: HEADING_FONT }}
                />
                <div className="space-y-3">
                  {data.schoolImpact.schools[2]?.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start gap-3">
                      <div className="mt-[4px] h-[6px] w-[6px] shrink-0 rounded-full" style={{ background: CLAY }} />
                      <EditableText
                        value={point}
                        onChange={(value) =>
                          updateSchoolPoint("schoolImpact", 2, pointIndex, value)
                        }
                        editMode={e}
                        tag="p"
                        className="text-[7.8pt] leading-relaxed"
                        style={{ color: INK_MID }}
                      />
                    </div>
                  ))}
                </div>
                {data.schoolImpact.schools[2]?.footnote ? (
                  <div
                    className="mt-4 rounded-[4mm] border px-[4mm] py-[3.5mm]"
                    style={{ borderColor: "rgba(201,111,77,0.14)", background: "rgba(201,111,77,0.05)" }}
                  >
                    <EditableText
                      value={data.schoolImpact.schools[2].footnote ?? ""}
                      onChange={(value) => updateSchoolField("schoolImpact", 2, "footnote", value)}
                      editMode={e}
                      tag="p"
                      className="text-[7.2pt] italic leading-relaxed"
                      style={{ color: INK_MID }}
                    />
                  </div>
                ) : null}
              </PaperPanel>

              <div className="space-y-[4mm]">
                <PaperPanel
                  accent={FOREST_DEEP}
                  background="linear-gradient(180deg, rgba(23,63,53,0.05), rgba(255,255,255,0.98))"
                >
                  <PanelLabel label="Innovation and Technology" tone={FOREST_DEEP} />
                  <EditableText
                    value={data.innovationProgress.description}
                    onChange={(value) => updateField("innovationProgress.description", value)}
                    editMode={e}
                    tag="p"
                    className="text-[8pt] leading-relaxed"
                    style={{ color: INK_MID }}
                  />
                </PaperPanel>

                <div className="grid grid-cols-3 gap-[3mm]">
                  {data.innovationProgress.stats.map((stat, index) => (
                    <div
                      key={index}
                      className="rounded-[5mm] border px-[3mm] py-[4mm] text-center"
                      style={{
                        background:
                          index === 0
                            ? "rgba(23,63,53,0.92)"
                            : index === 1
                              ? "rgba(216,161,63,0.18)"
                              : "rgba(45,106,79,0.14)",
                        borderColor: "rgba(23,63,53,0.08)",
                      }}
                    >
                      <EditableText
                        value={stat.value}
                        onChange={(value) => updateStat("innovationProgress", index, "value", value)}
                        editMode={e}
                        tag="p"
                        multiline={false}
                        className="text-[17pt] font-black leading-none"
                        style={{
                          color: index === 0 ? "#fff" : index === 1 ? AMBER : MOSS,
                          fontFamily: HEADING_FONT,
                        }}
                      />
                      <EditableText
                        value={stat.label}
                        onChange={(value) => updateStat("innovationProgress", index, "label", value)}
                        editMode={e}
                        tag="p"
                        className="mt-2 text-[6.2pt] leading-snug"
                        style={{ color: index === 0 ? "rgba(255,255,255,0.72)" : INK_MID }}
                      />
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-[6mm] px-[6mm] py-[6mm]"
                  style={{ background: FOREST_DEEP, boxShadow: "0 20px 40px rgba(13,42,35,0.18)" }}
                >
                  <PanelLabel label="A catalytic gift" tone={AMBER} muted />
                  <p className="text-[8pt] leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
                    Thanks to Heather MC and her community, including schoolchildren who raised
                    USD 25,000, Musukwi Primary has established a well-equipped library and is
                    working toward a stronger digital catalog and learning environment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <PageFooter organizationName={org} pageNum={6} section="Innovation & School Stories" />
        </div>

        <div className="page" style={{ background: FOREST }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(216,161,63,0.16), transparent 25%), radial-gradient(circle at bottom left, rgba(201,111,77,0.16), transparent 30%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-[4mm]" style={{ background: CLAY }} />
          <div className="page-content">
            <PageIntro
              eyebrow="Infrastructure progress"
              title="Key developments across partner schools"
              subtitle="Laboratories, libraries, furniture, and examination access are reshaping what rural learners can expect."
              light
            />

            <div className="grid grid-cols-[1.05fr_0.95fr] gap-[5mm]">
              <div
                className="rounded-[6mm] border px-[6mm] py-[6mm]"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.08)",
                }}
              >
                <EditableText
                  value={data.keyDevelopments.schools[1]?.name ?? ""}
                  onChange={(value) => updateSchoolField("keyDevelopments", 1, "name", value)}
                  editMode={e}
                  tag="h3"
                  multiline={false}
                  className="mb-4 text-[18pt] font-black leading-none"
                  style={{ color: "#fff", fontFamily: HEADING_FONT }}
                />
                <div className="space-y-3">
                  {data.keyDevelopments.schools[1]?.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start gap-3">
                      <div className="mt-[4px] h-[6px] w-[6px] shrink-0 rounded-full" style={{ background: AMBER }} />
                      <EditableText
                        value={point}
                        onChange={(value) =>
                          updateSchoolPoint("keyDevelopments", 1, pointIndex, value)
                        }
                        editMode={e}
                        tag="p"
                        className="text-[7.6pt] leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.8)" }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-[4mm]">
                <div
                  className="rounded-[6mm] border px-[5mm] py-[5mm]"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.08)",
                  }}
                >
                  <EditableText
                    value={data.keyDevelopments.schools[0]?.name ?? ""}
                    onChange={(value) => updateSchoolField("keyDevelopments", 0, "name", value)}
                    editMode={e}
                    tag="h3"
                    multiline={false}
                    className="mb-3 text-[14pt] font-black leading-tight"
                    style={{ color: "#fff", fontFamily: HEADING_FONT }}
                  />
                  <div className="space-y-3">
                    {data.keyDevelopments.schools[0]?.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start gap-3">
                        <div className="mt-[4px] h-[6px] w-[6px] shrink-0 rounded-full" style={{ background: CLAY }} />
                        <EditableText
                          value={point}
                          onChange={(value) =>
                            updateSchoolPoint("keyDevelopments", 0, pointIndex, value)
                          }
                          editMode={e}
                          tag="p"
                          className="text-[7.3pt] leading-snug"
                          style={{ color: "rgba(255,255,255,0.76)" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-[6mm] border px-[5mm] py-[5mm]"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    background: "rgba(255,250,243,0.94)",
                  }}
                >
                  <PanelLabel label="Community impact" tone={FOREST_DEEP} />
                  <div className="space-y-3">
                    {data.keyDevelopments.impact.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-[4px] h-[6px] w-[6px] shrink-0 rounded-full" style={{ background: index === 1 ? CLAY : MOSS }} />
                        <EditableText
                          value={item}
                          onChange={(value) =>
                            updateListItem("keyDevelopments.impact", data.keyDevelopments.impact, index, value)
                          }
                          editMode={e}
                          tag="p"
                          className="text-[7.2pt] leading-snug"
                          style={{ color: INK_MID }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[5mm]">
              <p
                className="mb-3 text-[6.5pt] font-black uppercase tracking-[0.3em]"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Quarterly highlights
              </p>
              <div className="grid grid-cols-4 gap-[3mm]">
                {data.quarterlyHighlights.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-[4mm] border px-[3mm] py-[3.5mm]"
                    style={{
                      borderColor: "rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <div
                        className="flex h-[7mm] w-[7mm] items-center justify-center rounded-full text-[6pt] font-black text-white"
                        style={{ background: index % 2 === 0 ? CLAY : AMBER }}
                      >
                        {index + 1}
                      </div>
                      <span className="text-[5.8pt] font-black uppercase tracking-[0.24em]" style={{ color: "rgba(255,255,255,0.46)" }}>
                        Note
                      </span>
                    </div>
                    <EditableText
                      value={item}
                      onChange={(value) =>
                        updateListItem("quarterlyHighlights", data.quarterlyHighlights, index, value)
                      }
                      editMode={e}
                      tag="p"
                      className="text-[6.6pt] leading-snug"
                      style={{ color: "rgba(255,255,255,0.82)" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <PageFooter organizationName={org} pageNum={7} section="Key Developments" theme="dark" />
        </div>

        <div className="page" style={{ background: PAPER }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at top left, rgba(216,161,63,0.12), transparent 20%), radial-gradient(circle at bottom right, rgba(45,106,79,0.1), transparent 24%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-[3mm]" style={{ background: FOREST_DEEP }} />
          <div className="page-content">
            <PageIntro
              eyebrow="Closing note"
              title="Conclusion and continued partnership"
              subtitle="The quarter closes with stronger schools, clearer systems, and more reasons to keep building."
            />

            <div className="grid grid-cols-[1.02fr_0.98fr] gap-[6mm]">
              <PaperPanel
                accent={FOREST_DEEP}
                background="linear-gradient(180deg, rgba(23,63,53,0.05), rgba(255,255,255,0.98))"
              >
                <PanelLabel label="Conclusion" tone={FOREST_DEEP} />
                <EditableText
                  value={data.conclusion.body}
                  onChange={(value) => updateField("conclusion.body", value)}
                  editMode={e}
                  tag="p"
                  className="mb-4 text-[8pt] leading-relaxed"
                  style={{ color: INK_MID }}
                />
                <div className="space-y-3">
                  {data.conclusion.points.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className="mt-[4px] h-[6px] w-[6px] shrink-0 rounded-full"
                        style={{ background: index === 1 ? CLAY : FOREST_DEEP }}
                      />
                      <EditableText
                        value={item}
                        onChange={(value) =>
                          updateListItem("conclusion.points", data.conclusion.points, index, value)
                        }
                        editMode={e}
                        tag="p"
                        className="text-[7.5pt] leading-snug"
                        style={{ color: INK }}
                      />
                    </div>
                  ))}
                </div>
              </PaperPanel>

              <div className="space-y-[4mm]">
                <PaperPanel
                  accent={CLAY}
                  background="linear-gradient(180deg, rgba(201,111,77,0.08), rgba(255,255,255,0.98))"
                >
                  <PanelLabel label="Looking ahead" tone={CLAY} />
                  <EditableText
                    value={data.conclusion.closing}
                    onChange={(value) => updateField("conclusion.closing", value)}
                    editMode={e}
                    tag="p"
                    className="text-[8pt] italic leading-relaxed"
                    style={{ color: INK_MID }}
                  />
                </PaperPanel>

                <PaperPanel
                  accent={AMBER}
                  background="linear-gradient(180deg, rgba(216,161,63,0.12), rgba(255,255,255,0.98))"
                >
                  <PanelLabel label="Partnership message" tone={AMBER} />
                  <div className="space-y-3">
                    {data.thankYou.paragraphs.map((item, index) => (
                      <EditableText
                        key={index}
                        value={item}
                        onChange={(value) =>
                          updateListItem("thankYou.paragraphs", data.thankYou.paragraphs, index, value)
                        }
                        editMode={e}
                        tag="p"
                        className="text-[7.5pt] leading-relaxed"
                        style={{ color: index === 0 ? INK : INK_MID }}
                      />
                    ))}
                  </div>
                </PaperPanel>
              </div>
            </div>

            <div
              className="mt-[5mm] rounded-[6mm] border px-[6mm] py-[5mm]"
              style={{
                borderColor: "rgba(23,63,53,0.08)",
                background: "rgba(23,63,53,0.94)",
                boxShadow: "0 20px 40px rgba(13,42,35,0.18)",
              }}
            >
              <div className="grid grid-cols-3 gap-[4mm]">
                {[
                  { label: "Phone", field: "contacts.phone" as const, value: data.contacts.phone },
                  { label: "Address", field: "contacts.address" as const, value: data.contacts.address },
                  { label: "Website", field: "contacts.website" as const, value: data.contacts.website },
                ].map((item) => (
                  <div key={item.label} className="rounded-[4mm] border px-[4mm] py-[4mm]" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.05)" }}>
                    <p
                      className="mb-2 text-[6pt] font-black uppercase tracking-[0.28em]"
                      style={{ color: "rgba(255,255,255,0.42)" }}
                    >
                      {item.label}
                    </p>
                    <EditableText
                      value={item.value}
                      onChange={(value) => updateField(item.field, value)}
                      editMode={e}
                      tag="p"
                      multiline={false}
                      className="text-[8pt] font-semibold leading-snug"
                      style={{ color: "rgba(255,255,255,0.84)" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <PageFooter organizationName={org} pageNum={8} section="Conclusion & Contact" />
        </div>
      </div>

      {!editMode ? (
        <div className="screen-only py-4 text-center text-xs text-stone-600">
          In the print dialog, set <strong>Margins → None</strong> and enable{" "}
          <strong>Background graphics</strong> for the full layout treatment.
        </div>
      ) : null}
    </>
  );
}

function getSyncBadge(
  saveState: "loading" | "idle" | "saving" | "saved" | "error",
  errorMessage: string | null
) {
  if (saveState === "loading") {
    return { label: "Loading", cls: "bg-white/10 text-white/60" };
  }

  if (saveState === "saving") {
    return { label: "Saving", cls: "bg-amber-400/20 text-amber-200" };
  }

  if (saveState === "saved" || saveState === "idle") {
    return { label: "Synced", cls: "bg-emerald-400/20 text-emerald-200" };
  }

  return {
    label: errorMessage ? "Sync error" : "Offline",
    cls: "bg-red-500/20 text-red-200",
  };
}

function PageIntro({
  eyebrow,
  title,
  subtitle,
  light = false,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  light?: boolean;
}) {
  return (
    <div className="mb-[5mm] flex items-end justify-between gap-[8mm]">
      <div>
        <p
          className="mb-2 text-[6.8pt] font-black uppercase tracking-[0.35em]"
          style={{ color: light ? "rgba(255,255,255,0.5)" : CLAY }}
        >
          {eyebrow}
        </p>
        <h2
          className="text-[24pt] font-black leading-none"
          style={{ color: light ? "#fff" : FOREST_DEEP, fontFamily: HEADING_FONT }}
        >
          {title}
        </h2>
      </div>
      <p
        className="max-w-[78mm] text-right text-[7.4pt] leading-relaxed"
        style={{ color: light ? "rgba(255,255,255,0.7)" : INK_LIGHT }}
      >
        {subtitle}
      </p>
    </div>
  );
}

function PanelLabel({
  label,
  tone,
  muted = false,
}: {
  label: string;
  tone: string;
  muted?: boolean;
}) {
  return (
    <p
      className="mb-3 text-[6.3pt] font-black uppercase tracking-[0.3em]"
      style={{ color: muted ? tone : tone, opacity: muted ? 0.9 : 1 }}
    >
      {label}
    </p>
  );
}

function PaperPanel({
  accent,
  background = "#ffffff",
  children,
}: {
  accent: string;
  background?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="rounded-[6mm] border px-[5mm] py-[5mm]"
      style={{
        background,
        borderColor: "rgba(23,63,53,0.08)",
        boxShadow: "0 18px 40px rgba(23,63,53,0.06)",
        borderTopWidth: "2px",
        borderTopColor: accent,
      }}
    >
      {children}
    </div>
  );
}

function DarkPanel({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-[6mm] border px-[5mm] py-[5mm]"
      style={{
        background: "rgba(255,255,255,0.08)",
        borderColor: "rgba(255,255,255,0.08)",
        boxShadow: "0 20px 45px rgba(13,42,35,0.22)",
      }}
    >
      {children}
    </div>
  );
}
