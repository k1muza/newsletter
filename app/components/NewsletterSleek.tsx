"use client";

import Link from "next/link";
import { useNewsletterData } from "@/hooks/useNewsletterData";
import type { NewsletterSlug } from "@/lib/newsletterDesigns";
import { EditableText } from "./EditableText";
import { EditableImage } from "./EditableImage";
import { NewsletterLogo } from "./NewsletterLogo";
import { PageFooter } from "./PageShell";

// ── Design tokens ─────────────────────────────────────────────────────────────
const NAVY = "#1e3a5f";
const NAVY_MID = "#2d5a8e";
const AMBER = "#f59e0b";
const BORDER = "#e5e7eb";
const TEXT = "#0f172a";
const TEXT_MID = "#475569";
const TEXT_LIGHT = "#94a3b8";

function getSyncBadge(saveState: string, errorMessage: string | null) {
  if (saveState === "loading") return { label: "Loading", cls: "bg-white/10 text-white/60" };
  if (saveState === "saving")  return { label: "Saving",  cls: "bg-amber-400/20 text-amber-200" };
  if (saveState === "saved")   return { label: "Saved",   cls: "bg-emerald-400/20 text-emerald-300" };
  if (saveState === "error")   return { label: errorMessage ? "Error" : "Error", cls: "bg-red-400/20 text-red-300" };
  return { label: "Ready", cls: "bg-white/10 text-white/50" };
}

// ── Component ─────────────────────────────────────────────────────────────────
interface NewsletterSleekProps {
  newsletterSlug: NewsletterSlug;
}

export default function NewsletterSleek({ newsletterSlug }: NewsletterSleekProps) {
  const {
    clearImage, data, editMode, errorMessage, isUploading,
    loaded, resetToDefault, saveState, setEditMode,
    updateField, uploadImage,
  } = useNewsletterData(newsletterSlug);


  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  const e = editMode;
  const badge = getSyncBadge(saveState, errorMessage);
  const org = data.meta.organizationName;

  // ── Helpers ──────────────────────────────────────────────────────────────
  function updateStat(
    field: "scholarship" | "innovationProgress",
    i: number,
    key: "value" | "label",
    v: string,
  ) {
    const next = data[field].stats.map((s, j) => (j === i ? { ...s, [key]: v } : s));
    updateField(`${field}.stats`, next);
  }

  function updatePhoto(i: number, key: "caption", v: string) {
    const next = data.photos.map((p, j) => (j === i ? { ...p, [key]: v } : p));
    updateField("photos", next);
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Toolbar ────────────────────────────────────────────────────────── */}
      <div
        className="screen-only fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-2 text-xs font-semibold"
        style={{ background: NAVY }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] transition"
            style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}
          >
            ← Newsletters
          </Link>
          <span style={{ color: "rgba(255,255,255,0.45)" }}>
            Impact Brief · {data.meta.quarter} {data.meta.year}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] ${badge.cls}`}
            title={errorMessage ?? undefined}
          >
            {badge.label}
          </span>
          {editMode && (
            <button type="button" onClick={resetToDefault}
              className="transition-colors"
              style={{ color: AMBER }}
            >
              Reset defaults
            </button>
          )}
          <button
            type="button"
            onClick={() => setEditMode(!e)}
            className="rounded-full px-4 py-1.5 text-xs font-bold transition-all"
            style={editMode
              ? { background: AMBER, color: "#fff" }
              : { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }
            }
          >
            {editMode ? "Done editing" : "Edit content"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full px-4 py-1.5 text-xs font-bold transition-colors"
            style={{ background: "#fff", color: NAVY }}
          >
            Save as PDF
          </button>
        </div>
      </div>

      {/* ── Pages ──────────────────────────────────────────────────────────── */}
      <div className={`pb-12 pt-0 ${editMode ? "bg-amber-50/60" : "bg-slate-200"}`}>

        {/* ══════════════════════════════════════════════════════════════════
            PAGE 1 — COVER
        ══════════════════════════════════════════════════════════════════ */}
        <div className="page" style={{ background: NAVY }}>
          {/* Amber stripe */}
          <div className="absolute inset-x-0 top-0" style={{ height: "4mm", background: AMBER }} />

          {/* Left sidebar */}
          <div
            className="absolute bottom-0 top-0 flex flex-col items-center justify-between py-[20mm]"
            style={{ left: 0, width: "52mm", background: "rgba(0,0,0,0.18)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Logo */}
            <div className="flex flex-col items-center gap-2">
              <NewsletterLogo
                alt={`${org} logo`}
                className="h-[14mm] w-[30mm]"
                controlsClassName="right-0 top-0"
                editable
                editMode={e}
                image={data.meta.logo}
                imageClassName="h-full w-full object-contain"
                onRemove={() => clearImage("meta.logo")}
                onUpload={file => uploadImage("meta.logo", file)}
                placeholder={
                  <div
                    className="flex h-full w-full items-center justify-center rounded-[4mm] text-[7.5pt] font-black text-white"
                    style={{ background: AMBER }}
                  >
                    TTI
                  </div>
                }
                uploading={isUploading("meta.logo")}
              />
              <div className="text-center text-[5.8pt] font-bold uppercase tracking-[0.3em]"
                   style={{ color: "rgba(255,255,255,0.35)", maxWidth: "38mm" }}>
                <EditableText
                  value={data.meta.organizationName}
                  onChange={v => updateField("meta.organizationName", v)}
                  editMode={e} tag="span" multiline={false}
                />
              </div>
            </div>

            {/* Quarter + Year centered */}
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="h-px w-8" style={{ background: "rgba(255,255,255,0.2)" }} />
              <div className="text-[7pt] font-black uppercase tracking-[0.35em]"
                   style={{ color: "rgba(255,255,255,0.5)" }}>
                <EditableText value={data.meta.quarter} onChange={v => updateField("meta.quarter", v)}
                  editMode={e} tag="span" multiline={false} />
              </div>
              <div className="font-black leading-none text-white" style={{ fontSize: "28pt" }}>
                <EditableText value={data.meta.year} onChange={v => updateField("meta.year", v)}
                  editMode={e} tag="span" multiline={false} />
              </div>
              <div className="h-px w-8" style={{ background: "rgba(255,255,255,0.2)" }} />
            </div>

            {/* Prepared by */}
            <div className="text-center" style={{ maxWidth: "38mm" }}>
              <div className="mb-1 text-[5.5pt] font-bold uppercase tracking-[0.32em]"
                   style={{ color: "rgba(255,255,255,0.25)" }}>
                Prepared by
              </div>
              <div className="text-[7pt] font-semibold" style={{ color: "rgba(255,255,255,0.55)" }}>
                <EditableText value={data.meta.preparedBy} onChange={v => updateField("meta.preparedBy", v)}
                  editMode={e} tag="span" multiline={false} />
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="absolute bottom-[14mm] top-[14mm]"
               style={{ left: "64mm", right: "14mm" }}>
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-2">
              <div className="h-px w-5" style={{ background: AMBER }} />
              <EditableText
                value={data.meta.coverEyebrow}
                onChange={v => updateField("meta.coverEyebrow", v)}
                editMode={e}
                tag="span"
                multiline={false}
                className="text-[7pt] font-black uppercase tracking-[0.3em]"
                style={{ color: AMBER }}
              />
            </div>

            {/* Headline */}
            <h1 className="font-black leading-[0.88] text-white" style={{ fontSize: "52pt", letterSpacing: "-1.5px" }}>
              <EditableText value={data.meta.newsletterTitleLead}
                onChange={v => updateField("meta.newsletterTitleLead", v)}
                editMode={e} tag="span" multiline={false} />
            </h1>
            <h1 className="mb-6 font-black leading-[0.88]" style={{ fontSize: "52pt", letterSpacing: "-1.5px", color: AMBER }}>
              <EditableText value={data.meta.newsletterTitleAccent}
                onChange={v => updateField("meta.newsletterTitleAccent", v)}
                editMode={e} tag="span" multiline={false} />
            </h1>

            {/* Rule */}
            <div className="mb-5 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />

            {/* Tagline */}
            <p className="mb-5 text-[10.5pt] font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>
              <EditableText value={data.meta.tagline} onChange={v => updateField("meta.tagline", v)}
                editMode={e} tag="span" multiline={false} />
            </p>

            {/* Hero intro */}
            <p className="mb-4 text-[9pt] leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              <EditableText value={data.hero.intro} onChange={v => updateField("hero.intro", v)}
                editMode={e} tag="span" />
            </p>
            <p className="text-[9pt] leading-relaxed" style={{ color: "rgba(255,255,255,0.60)" }}>
              <EditableText value={data.hero.body1} onChange={v => updateField("hero.body1", v)}
                editMode={e} tag="span" />
            </p>

            {/* Stats row */}
            <div className="mt-auto pt-8">
              <div className="mb-3 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {data.scholarship.stats.slice(0, 4).map((stat, i) => (
                  <div key={i}>
                    <div className="text-[11pt] font-black leading-tight"
                         style={{ color: i % 2 === 0 ? "#fff" : AMBER }}>
                      <EditableText value={stat.value}
                        onChange={v => updateStat("scholarship", i, "value", v)}
                        editMode={e} tag="span" multiline={false} />
                    </div>
                    <div className="text-[6.5pt] uppercase tracking-[0.2em]"
                         style={{ color: "rgba(255,255,255,0.38)" }}>
                      <EditableText value={stat.label}
                        onChange={v => updateStat("scholarship", i, "label", v)}
                        editMode={e} tag="span" multiline={false} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <PageFooter organizationName={org} pageNum={1} theme="dark" />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            PAGE 2 — DIRECTOR MESSAGE + EXECUTIVE SUMMARY
        ══════════════════════════════════════════════════════════════════ */}
        <div className="page" style={{ background: "#ffffff" }}>
          {/* Amber top rule */}
          <div className="absolute inset-x-0 top-0" style={{ height: "3mm", background: AMBER }} />

          <div className="page-content">
            {/* Page header */}
            <div className="mb-6 flex items-end justify-between" style={{ borderBottom: `2px solid ${NAVY}`, paddingBottom: "3mm" }}>
              <div>
                <p className="text-[7pt] font-black uppercase tracking-[0.35em]" style={{ color: AMBER }}>
                  Director&apos;s Message
                </p>
                <h2 className="text-[18pt] font-black leading-tight" style={{ color: NAVY }}>
                  <EditableText value={data.directorMessage.subtitle}
                    onChange={v => updateField("directorMessage.subtitle", v)}
                    editMode={e} tag="span" multiline={false} />
                </h2>
              </div>
              <div className="text-right text-[7pt] font-semibold uppercase tracking-[0.25em]"
                   style={{ color: TEXT_LIGHT }}>
                {data.meta.quarter} · {data.meta.year}
              </div>
            </div>

            {/* Two column layout */}
            <div className="grid gap-[8mm]" style={{ gridTemplateColumns: "72mm 1fr" }}>
              {/* Left: portrait + bio */}
              <div>
                <EditableImage
                  alt={`${data.directorMessage.name} portrait`}
                  className="mb-4 w-full overflow-hidden rounded-[3mm]"
                  editMode={e}
                  image={data.directorMessage.image}
                  imageClassName="h-full w-full object-cover"
                  onRemove={() => clearImage("directorMessage.image")}
                  onUpload={file => uploadImage("directorMessage.image", file)}
                  placeholder={
                    <div className="flex aspect-[3/4] w-full flex-col items-center justify-center rounded-[3mm]"
                         style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY_MID} 100%)` }}>
                      <div className="mb-2 text-[7pt] font-black uppercase tracking-[0.28em]"
                           style={{ color: "rgba(255,255,255,0.5)" }}>
                        Director photo
                      </div>
                    </div>
                  }
                  uploading={isUploading("directorMessage.image")}
                >
                  <div className="absolute inset-x-0 bottom-0 px-4 py-3"
                       style={{ background: `linear-gradient(to top, ${NAVY}ee, transparent)` }}>
                    <EditableText value={data.directorMessage.name}
                      onChange={v => updateField("directorMessage.name", v)}
                      editMode={e} tag="p" multiline={false}
                      className="text-[9pt] font-black text-white" />
                    <EditableText value={data.directorMessage.title}
                      onChange={v => updateField("directorMessage.title", v)}
                      editMode={e} tag="p" multiline={false}
                      className="text-[7.5pt] font-medium"
                      style={{ color: "rgba(255,255,255,0.65)" }} />
                  </div>
                </EditableImage>

                {/* Executive summary below photo */}
                <div className="rounded-[3mm] p-4"
                     style={{ background: "#f8fafc", border: `1px solid ${BORDER}` }}>
                  <p className="mb-2 text-[6.5pt] font-black uppercase tracking-[0.3em]"
                     style={{ color: AMBER }}>
                    At a Glance
                  </p>
                  <ul className="space-y-1.5">
                    {data.quarterlyHighlights.slice(0, 5).map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: AMBER }} />
                        <span className="text-[7.5pt] leading-snug" style={{ color: TEXT_MID }}>
                          <EditableText value={h}
                            onChange={v => {
                              const next = data.quarterlyHighlights.map((x, j) => j === i ? v : x);
                              updateField("quarterlyHighlights", next);
                            }}
                            editMode={e} tag="span" multiline={false} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: message paragraphs + exec summary */}
              <div>
                {data.directorMessage.paragraphs.map((para, i) => (
                  <p key={i} className="mb-4 text-[9pt] leading-relaxed" style={{ color: i === 0 ? TEXT : TEXT_MID }}>
                    <EditableText value={para}
                      onChange={v => {
                        const next = data.directorMessage.paragraphs.map((p, j) => j === i ? v : p);
                        updateField("directorMessage.paragraphs", next);
                      }}
                      editMode={e} tag="span" />
                  </p>
                ))}

                {/* Rule */}
                <div className="my-4 h-px" style={{ background: BORDER }} />

                {/* Exec summary */}
                <p className="mb-1 text-[6.5pt] font-black uppercase tracking-[0.3em]" style={{ color: NAVY }}>
                  Executive Summary
                </p>
                <p className="mb-3 text-[9pt] font-semibold leading-relaxed" style={{ color: TEXT }}>
                  <EditableText value={data.executiveSummary.body1}
                    onChange={v => updateField("executiveSummary.body1", v)}
                    editMode={e} tag="span" />
                </p>
                <p className="mb-2 text-[8.5pt] leading-relaxed" style={{ color: TEXT_MID }}>
                  <EditableText value={data.executiveSummary.body2}
                    onChange={v => updateField("executiveSummary.body2", v)}
                    editMode={e} tag="span" />
                </p>
                <ul className="space-y-1">
                  {data.executiveSummary.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="mt-[4px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: NAVY }} />
                      <span className="text-[8.5pt] leading-snug" style={{ color: TEXT_MID }}>
                        <EditableText value={pt}
                          onChange={v => {
                            const next = data.executiveSummary.points.map((x, j) => j === i ? v : x);
                            updateField("executiveSummary.points", next);
                          }}
                          editMode={e} tag="span" multiline={false} />
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Conclusion */}
                <div className="mt-4 rounded-[3mm] p-4"
                     style={{ background: NAVY }}>
                  <p className="mb-1 text-[6.5pt] font-black uppercase tracking-[0.28em]"
                     style={{ color: "rgba(255,255,255,0.4)" }}>
                    Our Commitment
                  </p>
                  <p className="text-[8.5pt] leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
                    <EditableText value={data.conclusion.closing}
                      onChange={v => updateField("conclusion.closing", v)}
                      editMode={e} tag="span" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <PageFooter organizationName={org} pageNum={2} section="Director" />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            PAGE 3 — SCHOOL IMPACT + SCHOLARSHIP
        ══════════════════════════════════════════════════════════════════ */}
        <div className="page" style={{ background: "#ffffff" }}>
          <div className="absolute inset-x-0 top-0" style={{ height: "3mm", background: AMBER }} />

          <div className="page-content">
            {/* Page header */}
            <div className="mb-5 flex items-end justify-between"
                 style={{ borderBottom: `2px solid ${NAVY}`, paddingBottom: "3mm" }}>
              <div>
                <p className="text-[7pt] font-black uppercase tracking-[0.35em]" style={{ color: AMBER }}>
                  Impact Report
                </p>
                <h2 className="text-[18pt] font-black leading-tight" style={{ color: NAVY }}>
                  School Impact &amp; Scholarships
                </h2>
              </div>
            </div>

            {/* Scholarship stats strip */}
            <div className="mb-5 grid grid-cols-4 gap-3">
              {data.scholarship.stats.map((stat, i) => (
                <div key={i} className="rounded-[3mm] p-3"
                     style={{ background: i === 3 ? NAVY : "#f8fafc", border: `1px solid ${i === 3 ? "transparent" : BORDER}` }}>
                  <div className="mb-1 text-[11pt] font-black leading-tight"
                       style={{ color: i === 3 ? AMBER : NAVY }}>
                    <EditableText value={stat.value}
                      onChange={v => updateStat("scholarship", i, "value", v)}
                      editMode={e} tag="span" multiline={false} />
                  </div>
                  <div className="text-[6.2pt] uppercase tracking-[0.2em] leading-snug"
                       style={{ color: i === 3 ? "rgba(255,255,255,0.5)" : TEXT_LIGHT }}>
                    <EditableText value={stat.label}
                      onChange={v => updateStat("scholarship", i, "label", v)}
                      editMode={e} tag="span" multiline={false} />
                  </div>
                </div>
              ))}
            </div>

            {/* Schools grid */}
            <div className="mb-5 grid grid-cols-2 gap-4">
              {data.schoolImpact.schools.map((school, i) => (
                <div key={i} className="rounded-[3mm] p-4"
                     style={{ border: `1px solid ${BORDER}`, borderLeft: `4px solid ${i % 2 === 0 ? NAVY : AMBER}` }}>
                  <p className="mb-2 text-[8.5pt] font-black" style={{ color: TEXT }}>
                    {school.name}
                  </p>
                  <ul className="space-y-1">
                    {school.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-1.5">
                        <div className="mt-[4px] h-1 w-1 shrink-0 rounded-full"
                             style={{ background: i % 2 === 0 ? NAVY : AMBER }} />
                        <span className="text-[7.5pt] leading-snug" style={{ color: TEXT_MID }}>
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {school.footnote && (
                    <p className="mt-2 text-[6.8pt] italic leading-snug" style={{ color: TEXT_LIGHT }}>
                      {school.footnote}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Innovation stats + self-sustaining side by side */}
            <div className="grid grid-cols-2 gap-4">
              {/* Innovation */}
              <div className="rounded-[3mm] p-4" style={{ background: "#f8fafc", border: `1px solid ${BORDER}` }}>
                <p className="mb-3 text-[6.5pt] font-black uppercase tracking-[0.3em]" style={{ color: NAVY }}>
                  Innovation &amp; Infrastructure
                </p>
                <div className="mb-3 grid grid-cols-3 gap-2">
                  {data.innovationProgress.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-[18pt] font-black leading-none" style={{ color: i === 0 ? NAVY : i === 1 ? AMBER : "#0d9488" }}>
                        <EditableText value={stat.value}
                          onChange={v => updateStat("innovationProgress", i, "value", v)}
                          editMode={e} tag="span" multiline={false} />
                      </div>
                      <div className="text-[6pt] uppercase tracking-[0.18em] leading-tight mt-0.5"
                           style={{ color: TEXT_LIGHT }}>
                        <EditableText value={stat.label}
                          onChange={v => updateStat("innovationProgress", i, "label", v)}
                          editMode={e} tag="span" multiline={false} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[7.5pt] leading-relaxed" style={{ color: TEXT_MID }}>
                  <EditableText value={data.innovationProgress.description}
                    onChange={v => updateField("innovationProgress.description", v)}
                    editMode={e} tag="span" />
                </p>
              </div>

              {/* Self-sustaining */}
              <div className="rounded-[3mm] p-4" style={{ background: NAVY }}>
                <p className="mb-2 text-[6.5pt] font-black uppercase tracking-[0.3em]"
                   style={{ color: "rgba(255,255,255,0.45)" }}>
                  Self-Sustaining Model
                </p>
                <p className="mb-3 text-[7.5pt] leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                  <EditableText value={data.selfSustaining.description}
                    onChange={v => updateField("selfSustaining.description", v)}
                    editMode={e} tag="span" />
                </p>
                <ul className="space-y-1.5">
                  {data.selfSustaining.progress.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="mt-[4px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: AMBER }} />
                      <span className="text-[7.5pt] leading-snug" style={{ color: "rgba(255,255,255,0.7)" }}>
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <PageFooter organizationName={org} pageNum={3} section="Impact" />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            PAGE 4 — BENEFICIARY STORY + KEY DEVELOPMENTS
        ══════════════════════════════════════════════════════════════════ */}
        <div className="page" style={{ background: "#ffffff" }}>
          <div className="absolute inset-x-0 top-0" style={{ height: "3mm", background: AMBER }} />

          <div className="page-content">
            <div className="mb-5 flex items-end justify-between"
                 style={{ borderBottom: `2px solid ${NAVY}`, paddingBottom: "3mm" }}>
              <div>
                <p className="text-[7pt] font-black uppercase tracking-[0.35em]" style={{ color: AMBER }}>
                  Beneficiary Story
                </p>
                <h2 className="text-[18pt] font-black leading-tight" style={{ color: NAVY }}>
                  Lives Transformed
                </h2>
              </div>
            </div>

            <div className="grid gap-[8mm]" style={{ gridTemplateColumns: "60mm 1fr" }}>
              {/* Left: portrait */}
              <div>
                <EditableImage
                  alt={`${data.beneficiaryStory.name} portrait`}
                  className="mb-4 w-full overflow-hidden rounded-[3mm]"
                  editMode={e}
                  image={data.beneficiaryStory.image}
                  imageClassName="h-full w-full object-cover"
                  onRemove={() => clearImage("beneficiaryStory.image")}
                  onUpload={file => uploadImage("beneficiaryStory.image", file)}
                  placeholder={
                    <div className="flex w-full flex-col items-center justify-center rounded-[3mm]"
                         style={{ background: "#f1f5f9", aspectRatio: "3/4", border: `1px solid ${BORDER}` }}>
                      <div className="text-[7pt] font-black uppercase tracking-[0.28em]"
                           style={{ color: TEXT_LIGHT }}>
                        Story photo
                      </div>
                    </div>
                  }
                  uploading={isUploading("beneficiaryStory.image")}
                />

                {/* Pull-quote decoration */}
                <div className="rounded-[3mm] p-4"
                     style={{ background: NAVY, marginTop: "0" }}>
                  <div className="mb-2 text-[24pt] font-black leading-none"
                       style={{ color: AMBER, lineHeight: 1 }}>&ldquo;</div>
                  <p className="text-[8pt] font-semibold italic leading-relaxed"
                     style={{ color: "rgba(255,255,255,0.82)" }}>
                    {data.beneficiaryStory.paragraphs[1]?.split('"')[1] ??
                      "TTI believed in me when I had almost lost hope."}
                  </p>
                </div>
              </div>

              {/* Right: story paragraphs + key developments */}
              <div>
                <p className="mb-3 text-[10pt] font-black" style={{ color: TEXT }}>
                  <EditableText value={data.beneficiaryStory.name}
                    onChange={v => updateField("beneficiaryStory.name", v)}
                    editMode={e} tag="span" multiline={false} />
                </p>

                {data.beneficiaryStory.paragraphs.map((para, i) => (
                  <p key={i} className="mb-3 text-[8.5pt] leading-relaxed" style={{ color: TEXT_MID }}>
                    <EditableText value={para}
                      onChange={v => {
                        const next = data.beneficiaryStory.paragraphs.map((p, j) => j === i ? v : p);
                        updateField("beneficiaryStory.paragraphs", next);
                      }}
                      editMode={e} tag="span" />
                  </p>
                ))}

                {/* Key developments */}
                <div className="mt-4" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "4mm" }}>
                  <p className="mb-3 text-[6.5pt] font-black uppercase tracking-[0.3em]" style={{ color: NAVY }}>
                    Key Developments
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {data.keyDevelopments.schools.map((school, i) => (
                      <div key={i} className="rounded-[2mm] p-3"
                           style={{ background: "#f8fafc", border: `1px solid ${BORDER}`, borderTop: `3px solid ${i === 0 ? NAVY : AMBER}` }}>
                        <p className="mb-1.5 text-[7.5pt] font-black" style={{ color: TEXT }}>{school.name}</p>
                        <ul className="space-y-1">
                          {school.points.slice(0, 3).map((pt, j) => (
                            <li key={j} className="flex items-start gap-1.5">
                              <div className="mt-[4px] h-1 w-1 shrink-0 rounded-full"
                                   style={{ background: i === 0 ? NAVY : AMBER }} />
                              <span className="text-[7pt] leading-snug" style={{ color: TEXT_MID }}>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PageFooter organizationName={org} pageNum={4} section="Stories" />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            PAGE 5 — FIELD NOTES IN PICTURES
        ══════════════════════════════════════════════════════════════════ */}
        <div className="page" style={{ background: "#f8fafc" }}>
          <div className="absolute inset-x-0 top-0" style={{ height: "3mm", background: AMBER }} />

          {/* Page header band */}
          <div className="absolute inset-x-0 px-[14mm] pt-[8mm]">
            <div className="flex items-end justify-between"
                 style={{ borderBottom: `2px solid ${NAVY}`, paddingBottom: "3mm" }}>
              <div>
                <p className="text-[7pt] font-black uppercase tracking-[0.35em]" style={{ color: AMBER }}>
                  Field Notes
                </p>
                <h2 className="text-[18pt] font-black leading-tight" style={{ color: NAVY }}>
                  In Pictures
                </h2>
              </div>
              <p className="max-w-[80mm] text-right text-[8pt] leading-relaxed" style={{ color: TEXT_MID }}>
                <EditableText value={data.hero.body2} onChange={v => updateField("hero.body2", v)}
                  editMode={e} tag="span" />
              </p>
            </div>
          </div>

          {/* Photo grid */}
          <div className="absolute grid grid-cols-3 gap-[3mm]"
               style={{ top: "38mm", left: "14mm", right: "14mm", bottom: "14mm" }}>
            {data.photos.slice(0, 6).map((photo, i) => (
              <div key={i} className="relative flex flex-col overflow-hidden rounded-[3mm]"
                   style={{ border: `1px solid ${BORDER}` }}>
                <EditableImage
                  alt={photo.caption}
                  className="absolute inset-0"
                  controlsClassName="right-2 top-2"
                  editMode={e}
                  image={photo.image}
                  imageClassName="absolute inset-0 h-full w-full object-cover"
                  onRemove={() => clearImage(`photos.${i}.image`)}
                  onUpload={file => uploadImage(`photos.${i}.image`, file)}
                  placeholder={
                    <div className="absolute inset-0 flex flex-col items-center justify-center"
                         style={{ background: "#f1f5f9" }}>
                      <div className="mb-1 text-[6.5pt] font-black uppercase tracking-[0.28em]"
                           style={{ color: TEXT_LIGHT }}>
                        {photo.placeholder.replace(/-/g, " ")}
                      </div>
                      <p className="text-center text-[6.5pt] leading-relaxed"
                         style={{ color: TEXT_LIGHT, maxWidth: "38mm" }}>
                        Upload a field image
                      </p>
                    </div>
                  }
                  uploading={isUploading(`photos.${i}.image`)}
                >
                  {photo.image.url && (
                    <div className="absolute inset-x-0 bottom-0"
                         style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)", height: "40%" }} />
                  )}
                </EditableImage>

                {/* Caption */}
                <div className="relative mt-auto px-3 py-2"
                     style={{ background: photo.image.url ? "transparent" : "#fff", zIndex: 1 }}>
                  <EditableText value={photo.caption}
                    onChange={v => updatePhoto(i, "caption", v)}
                    editMode={e} tag="p"
                    className="text-[6.5pt] font-medium leading-snug"
                    style={{ color: photo.image.url ? "rgba(255,255,255,0.9)" : TEXT_MID }} />
                </div>
              </div>
            ))}
          </div>

          <PageFooter organizationName={org} pageNum={5} section="In Pictures" />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            PAGE 6 — THANK YOU + CONTACTS
        ══════════════════════════════════════════════════════════════════ */}
        <div className="page" style={{ background: NAVY }}>
          <div className="absolute inset-x-0 top-0" style={{ height: "4mm", background: AMBER }} />

          <div className="page-content flex flex-col items-center justify-center text-center">
            {/* TTI mark */}
            <NewsletterLogo
              alt={`${org} logo`}
              className="mb-6 h-[18mm] w-[32mm]"
              image={data.meta.logo}
              imageClassName="h-full w-full object-contain"
              placeholder={
                <div
                  className="flex h-full w-full items-center justify-center rounded-[5mm] text-[9pt] font-black text-white"
                  style={{ background: AMBER }}
                >
                  TTI
                </div>
              }
            />

            <p className="mb-2 text-[7.5pt] font-black uppercase tracking-[0.4em]"
               style={{ color: "rgba(255,255,255,0.35)" }}>
              Thank You
            </p>
            <h2 className="mb-6 font-black leading-tight text-white" style={{ fontSize: "28pt" }}>
              Together, We Transform Lives
            </h2>

            <div className="mb-6 h-px w-[60mm]" style={{ background: "rgba(255,255,255,0.12)" }} />

            {data.thankYou.paragraphs.map((para, i) => (
              <p key={i} className="mb-4 text-[9pt] leading-relaxed"
                 style={{ color: "rgba(255,255,255,0.7)", maxWidth: "140mm" }}>
                <EditableText value={para}
                  onChange={v => {
                    const next = data.thankYou.paragraphs.map((p, j) => j === i ? v : p);
                    updateField("thankYou.paragraphs", next);
                  }}
                  editMode={e} tag="span" />
              </p>
            ))}

            <div className="mb-6 h-px w-[60mm]" style={{ background: "rgba(255,255,255,0.12)" }} />

            {/* Contacts */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: "Phone", value: data.contacts.phone, field: "contacts.phone" as const },
                { label: "Address", value: data.contacts.address, field: "contacts.address" as const },
                { label: "Website", value: data.contacts.website, field: "contacts.website" as const },
              ].map(({ label, value, field }) => (
                <div key={label}>
                  <p className="mb-1 text-[6pt] font-black uppercase tracking-[0.35em]"
                     style={{ color: "rgba(255,255,255,0.3)" }}>
                    {label}
                  </p>
                  <p className="text-[8pt] font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>
                    <EditableText value={value} onChange={v => updateField(field, v)}
                      editMode={e} tag="span" multiline={false} />
                  </p>
                </div>
              ))}
            </div>

            {/* Tagline at bottom */}
            <div className="mt-8">
              <p className="text-[7.5pt] font-semibold uppercase tracking-[0.28em]"
                 style={{ color: "rgba(255,255,255,0.3)" }}>
                <EditableText value={data.meta.tagline} onChange={v => updateField("meta.tagline", v)}
                  editMode={e} tag="span" multiline={false} />
              </p>
            </div>
          </div>

          <PageFooter organizationName={org} pageNum={6} theme="dark" />
        </div>
      </div>

    </>
  );
}
