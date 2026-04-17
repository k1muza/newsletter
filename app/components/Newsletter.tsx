"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useNewsletterData } from "@/hooks/useNewsletterData";
import {
  getNewsletterThemeHref,
  type NewsletterDesignDefinition,
  type NewsletterDesignSlug,
} from "@/lib/newsletterDesigns";
import { EditableImage } from "./EditableImage";
import { EditableText } from "./EditableText";
import { SectionHeader } from "./SectionHeader";
import { StatCard } from "./StatCard";
import { SchoolCard } from "./SchoolCard";
import { PageFooter } from "./PageShell";
import { ThemeSwitcherModal } from "./ThemeSwitcherModal";

interface NewsletterProps {
  design: NewsletterDesignDefinition;
}

export default function Newsletter({ design }: NewsletterProps) {
  const router = useRouter();
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isThemePending, startThemeTransition] = useTransition();
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
  } = useNewsletterData();

  useEffect(() => {
    if (!isThemeModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsThemeModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isThemeModalOpen]);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const e = editMode;
  const syncBadge = getSyncBadge(saveState, errorMessage);

  function handleThemeSelect(slug: NewsletterDesignSlug) {
    setIsThemeModalOpen(false);

    if (slug === design.slug) {
      return;
    }

    startThemeTransition(() => {
      router.replace(getNewsletterThemeHref(slug), { scroll: false });
    });
  }

  return (
    <>
      {/* ── Screen toolbar ─────────────────────────────────────── */}
      <div className={`screen-only fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-2 text-xs font-semibold ${design.screen.toolbar}`}>
        <span className="text-gray-400">TTI Newsletter · {data.meta.quarter} {data.meta.year}</span>
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] ${syncBadge.className}`}
            title={errorMessage ?? undefined}
          >
            {syncBadge.label}
          </span>
          <button
            type="button"
            aria-expanded={isThemeModalOpen}
            aria-haspopup="dialog"
            disabled={isThemePending}
            onClick={() => setIsThemeModalOpen(true)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${design.screen.editInactive} ${
              isThemePending ? "cursor-wait opacity-70" : ""
            }`}
          >
            Theme: {design.name}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={resetToDefault}
              className={`transition-colors ${design.screen.reset}`}
            >
              Reset defaults
            </button>
          )}
          <button
            type="button"
            onClick={() => setEditMode(!e)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              editMode ? design.screen.editActive : design.screen.editInactive
            }`}
          >
            {editMode ? "Done editing" : "Edit content"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${design.screen.print}`}
          >
            Save as PDF
          </button>
        </div>
      </div>

      {/* ── Pages wrapper ──────────────────────────────────────── */}
      <div className={`pt-0 pb-12 ${editMode ? design.screen.editingBackground : design.screen.viewingBackground}`}>

        {/* ════════════════════════════════════════════════════════
            PAGE 1 — COVER
        ════════════════════════════════════════════════════════ */}
        <div className="page" style={{ background: design.cover.pageBackground }}>
          {/* Top orange rule */}
          <div className="absolute top-0 inset-x-0 h-[6px] bg-orange-500" />

          {/* Decorative geometry */}
          <div className="absolute top-0 right-0 w-[90mm] h-[90mm]"
            style={{ background: design.cover.triangleBackground, clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
          <div className="absolute top-[20mm] right-[8mm] w-[28mm] h-[28mm] rounded-full"
            style={{ background: design.cover.largeCircleBackground }} />
          <div className="absolute top-[34mm] right-[22mm] w-[14mm] h-[14mm] rounded-full"
            style={{ background: design.cover.smallCircleBackground }} />

          {/* Bottom decorative block */}
          <div className="absolute bottom-0 left-0 right-0 h-[55mm]"
            style={{ background: design.cover.bottomGlowBackground }} />
          <div className="absolute bottom-[10mm] left-0 right-0 h-[3px] bg-orange-500 opacity-40" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col px-[14mm] pt-[18mm] pb-[14mm]">
            {/* Logo row */}
            <div className="flex items-center gap-3 mb-auto">
              <div className={`w-[9mm] h-[9mm] rounded-full flex items-center justify-center text-white font-black text-[8pt] ${design.cover.logoDot}`}>
                TTI
              </div>
              <EditableText
                value={data.meta.organizationName}
                onChange={v => updateField("meta.organizationName", v)}
                editMode={e}
                tag="span"
                className="text-white/60 text-[8pt] font-semibold uppercase tracking-widest"
                multiline={false}
              />
            </div>

            {/* Quarter badge */}
            <div className="inline-flex items-center gap-2 mb-5 self-start">
              <div className={`text-[8pt] font-black uppercase tracking-widest px-3 py-1 ${design.cover.badge}`}>
                <EditableText value={data.meta.quarter} onChange={v => updateField("meta.quarter", v)} editMode={e} tag="span" multiline={false} />
                {" · "}
                <EditableText value={data.meta.year} onChange={v => updateField("meta.year", v)} editMode={e} tag="span" multiline={false} />
              </div>
              <div className={`h-[1px] w-[20mm] ${design.cover.badgeRule}`} />
            </div>

            {/* Main headline */}
            <h1 className="text-white font-black leading-none mb-6" style={{ fontSize: "52pt", letterSpacing: "-1px" }}>
              <EditableText
                value={data.meta.newsletterTitleLead}
                onChange={v => updateField("meta.newsletterTitleLead", v)}
                editMode={e}
                tag="span"
                multiline={false}
              />
              <br />
              <EditableText
                value={data.meta.newsletterTitleAccent}
                onChange={v => updateField("meta.newsletterTitleAccent", v)}
                editMode={e}
                tag="span"
                multiline={false}
                className="inline-block"
                style={{ color: design.cover.headlineAccent }}
              />
            </h1>

            {/* Tagline */}
            <EditableText
              value={data.meta.tagline}
              onChange={v => updateField("meta.tagline", v)}
              editMode={e} tag="p"
              className={`${design.cover.tagline} text-[9pt] font-medium uppercase tracking-[3px] mb-10`}
              multiline={false}
            />

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className={`h-[1px] w-[12mm] ${design.cover.dividerLead}`} />
              <div className={`h-[4px] w-[4px] rounded-full ${design.cover.dividerDot}`} />
              <div className={`h-[1px] flex-1 ${design.cover.dividerTrail}`} />
            </div>

            {/* Summary blurb */}
            <div className="grid grid-cols-2 gap-8 mb-10">
              <EditableText
                value={data.hero.intro}
                onChange={v => updateField("hero.intro", v)}
                editMode={e} tag="p"
                className="text-white/70 text-[9.5pt] leading-relaxed"
              />
              <div className="space-y-3">
                <EditableText value={data.hero.body1} onChange={v => updateField("hero.body1", v)} editMode={e} tag="p" className="text-white/55 text-[9pt] leading-relaxed" />
                <EditableText value={data.hero.body2} onChange={v => updateField("hero.body2", v)} editMode={e} tag="p" className="text-white/55 text-[9pt] leading-relaxed" />
              </div>
            </div>

            {/* Prepared by */}
            <div className="flex items-center gap-3 mt-auto">
              <div className={`w-[1px] h-[8mm] ${design.cover.preparedByLine}`} />
              <div>
                <p className="text-white/30 text-[7pt] uppercase tracking-widest mb-0.5">Prepared by</p>
                <EditableText value={data.meta.preparedBy} onChange={v => updateField("meta.preparedBy", v)} editMode={e} tag="p" className="text-white text-[9pt] font-bold" multiline={false} />
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════
            PAGE 2 — DIRECTOR'S MESSAGE
        ════════════════════════════════════════════════════════ */}
        <div className="page bg-white">
          {/* Teal header band */}
          <div className="absolute top-0 inset-x-0 h-[18mm] bg-teal-600 flex items-center px-[12mm] justify-between">
            <EditableText
              value={data.meta.organizationName}
              onChange={v => updateField("meta.organizationName", v)}
              editMode={e}
              tag="span"
              className="text-white text-[8pt] font-black uppercase tracking-widest"
              multiline={false}
            />
            <div className="w-[8mm] h-[8mm] rounded-full bg-white/20 flex items-center justify-center text-white text-[7pt] font-black">TTI</div>
          </div>

          {/* Orange accent stripe below header */}
          <div className="absolute top-[18mm] inset-x-0 h-[3px] bg-orange-500" />

          <div className="page-content" style={{ top: "21mm" }}>
            <SectionHeader accent="orange">Country Director&apos;s Message</SectionHeader>

            <div className="grid grid-cols-[52mm_1fr] gap-[8mm]">
              {/* Photo column */}
              <div>
                <EditableImage
                  alt={`${data.directorMessage.name} portrait`}
                  className="mb-3 w-full overflow-hidden rounded"
                  editMode={e}
                  image={data.directorMessage.image}
                  imageClassName="h-full w-full object-cover"
                  onRemove={() => clearImage("directorMessage.image")}
                  onUpload={file => uploadImage("directorMessage.image", file)}
                  placeholder={
                    <div className="flex aspect-[3/4] w-full flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-center">
                      <div className="mb-3 rounded-full border border-white/70 bg-white/70 px-4 py-1.5 text-[7pt] font-black uppercase tracking-[0.28em] text-gray-500">
                        Director photo
                      </div>
                      <p className="max-w-[34mm] text-[8pt] font-medium leading-relaxed text-gray-500">
                        Upload a portrait for the director message.
                      </p>
                    </div>
                  }
                  uploading={isUploading("directorMessage.image")}
                >
                  <div className="absolute inset-x-0 bottom-0 bg-teal-600 text-white px-3 py-2">
                    <EditableText value={data.directorMessage.name} onChange={v => updateField("directorMessage.name", v)} editMode={e} tag="p" className="font-black text-[9pt]" multiline={false} />
                    <EditableText value={data.directorMessage.title} onChange={v => updateField("directorMessage.title", v)} editMode={e} tag="p" className="text-teal-200 text-[7.5pt]" multiline={false} />
                  </div>
                </EditableImage>
                {/* Decorative element */}
                <div className="flex gap-1.5 mt-3">
                  <div className="h-[3px] flex-1 bg-orange-500" />
                  <div className="h-[3px] w-[6mm] bg-teal-500" />
                  <div className="h-[3px] w-[3mm] bg-gray-200" />
                </div>
              </div>

              {/* Message column */}
              <div>
                <EditableText
                  value={data.directorMessage.subtitle}
                  onChange={v => updateField("directorMessage.subtitle", v)}
                  editMode={e} tag="h3"
                  className="font-black text-[13pt] text-gray-900 leading-tight mb-5"
                  multiline={false}
                />
                <div className="w-[8mm] h-[2px] bg-orange-500 mb-5" />
                {data.directorMessage.paragraphs.map((para, i) => (
                  <EditableText key={i} value={para}
                    onChange={v => { const n = [...data.directorMessage.paragraphs]; n[i] = v; updateField("directorMessage.paragraphs", n); }}
                    editMode={e} tag="p"
                    className="text-gray-600 text-[9.5pt] leading-relaxed mb-4"
                  />
                ))}

                {/* Signature block */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                  <div className="w-[8mm] h-[8mm] rounded-full bg-teal-500 flex items-center justify-center text-white text-[7pt] font-black">NM</div>
                  <div>
                    <EditableText value={data.directorMessage.name} onChange={v => updateField("directorMessage.name", v)} editMode={e} tag="p" className="font-bold text-[8.5pt] text-gray-900" multiline={false} />
                    <EditableText value={data.directorMessage.title} onChange={v => updateField("directorMessage.title", v)} editMode={e} tag="p" className="text-[7.5pt] text-gray-500" multiline={false} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PageFooter organizationName={data.meta.organizationName} pageNum={1} section="Director's Message" />
        </div>

        {/* ════════════════════════════════════════════════════════
            PAGE 3 — ABOUT TTI
        ════════════════════════════════════════════════════════ */}
        <div className="page bg-white">
          {/* Left color bar */}
          <div className="absolute top-0 left-0 w-[4mm] h-full bg-teal-500" />

          <div className="page-content" style={{ left: "4mm", paddingLeft: "10mm" }}>
            <SectionHeader accent="teal">About TTI Foundation</SectionHeader>

            {/* Vision + Goal side by side */}
            <div className="grid grid-cols-2 gap-[5mm] mb-[6mm]">
              <div className="bg-gray-900 text-white p-[5mm] rounded">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-[5mm] h-[5mm] rounded-full bg-orange-500" />
                  <span className="text-orange-400 text-[7pt] font-black uppercase tracking-widest">Our Vision</span>
                </div>
                <EditableText value={data.about.vision} onChange={v => updateField("about.vision", v)} editMode={e} tag="p" className="text-white/85 text-[9pt] leading-relaxed font-medium" />
              </div>
              <div className="bg-orange-500 text-white p-[5mm] rounded">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-[5mm] h-[5mm] rounded-full bg-white/40" />
                  <span className="text-white/80 text-[7pt] font-black uppercase tracking-widest">Our Goal</span>
                </div>
                <EditableText value={data.about.goal} onChange={v => updateField("about.goal", v)} editMode={e} tag="p" className="text-white/90 text-[9pt] leading-relaxed font-medium" />
              </div>
            </div>

            {/* What We Do */}
            <div className="mb-[6mm]">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[8pt] font-black text-gray-400 uppercase tracking-widest">02 —</span>
                <span className="text-[11pt] font-black text-gray-900">What We Do</span>
              </div>
              <EditableText value={data.about.whatWeDoIntro} onChange={v => updateField("about.whatWeDoIntro", v)} editMode={e} tag="p" className="text-gray-600 text-[9pt] leading-relaxed mb-4" />
              <div className="grid grid-cols-3 gap-[4mm]">
                {data.about.whatWeDoItems.map((item, i) => (
                  <div key={i} className="border-l-[3px] border-orange-500 pl-3 py-1">
                    <span className="block text-orange-500 text-[8pt] font-black mb-1">0{i + 1}</span>
                    <EditableText value={item}
                      onChange={v => { const n = [...data.about.whatWeDoItems]; n[i] = v; updateField("about.whatWeDoItems", n); }}
                      editMode={e} tag="p" className="text-gray-800 text-[8.5pt] font-semibold leading-snug"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Purpose — teal full-width box */}
            <div className="bg-teal-500 text-white p-[6mm] rounded">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-[4mm] h-[4mm] rounded-full bg-white/50" />
                <span className="text-white/70 text-[7pt] font-black uppercase tracking-widest">03 · Our Purpose</span>
              </div>
              <EditableText value={data.about.purpose} onChange={v => updateField("about.purpose", v)} editMode={e} tag="p" className="text-white/90 text-[9.5pt] leading-relaxed" />
            </div>
          </div>
          <PageFooter organizationName={data.meta.organizationName} pageNum={2} section="About TTI Foundation" />
        </div>

        {/* ════════════════════════════════════════════════════════
            PAGE 4 — EXECUTIVE SUMMARY
        ════════════════════════════════════════════════════════ */}
        <div className="page" style={{ background: "#f8fafc" }}>
          {/* Orange top bar */}
          <div className="absolute top-0 inset-x-0 h-[3px] bg-orange-500" />
          {/* Large background text */}
          <div className="absolute top-[10mm] right-[8mm] text-gray-100 font-black select-none pointer-events-none" style={{ fontSize: "80pt", lineHeight: 1 }}>Q1</div>

          <div className="page-content">
            <SectionHeader accent="orange">Executive Summary</SectionHeader>

            <div className="grid grid-cols-[1fr_48mm] gap-[10mm] mb-[8mm]">
              <div>
                <EditableText value={data.executiveSummary.body1} onChange={v => updateField("executiveSummary.body1", v)} editMode={e} tag="p" className="text-gray-900 text-[11pt] leading-relaxed font-semibold mb-4" />
                <EditableText value={data.executiveSummary.body2} onChange={v => updateField("executiveSummary.body2", v)} editMode={e} tag="p" className="text-gray-600 text-[9.5pt] leading-relaxed" />
              </div>
              {/* Key outcomes */}
              <div className="bg-gray-900 text-white p-[5mm] rounded self-start">
                <p className="text-orange-400 text-[7pt] font-black uppercase tracking-widest mb-3">Schools can now:</p>
                <div className="space-y-3">
                  {data.executiveSummary.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-[4mm] h-[4mm] rounded-full bg-orange-500 mt-[2px] flex-shrink-0" />
                      <EditableText value={pt}
                        onChange={v => { const n = [...data.executiveSummary.points]; n[i] = v; updateField("executiveSummary.points", n); }}
                        editMode={e} tag="span" className="text-white/85 text-[8.5pt] leading-snug"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chapter intro — Key Programme Areas */}
            <div className="mt-auto">
              <div className="h-[1px] bg-gray-200 mb-[8mm]" />
              <div className="bg-gray-900 text-white px-[8mm] py-[10mm] rounded flex items-center justify-between">
                <div>
                  <p className="text-orange-500 text-[8pt] font-black uppercase tracking-widest mb-2">Section 02</p>
                  <h2 className="text-white font-black text-[22pt] leading-none">Key Programme<br />Areas</h2>
                </div>
                <div className="flex gap-2">
                  <div className="w-[12mm] h-[12mm] rounded-full bg-orange-500 opacity-80" />
                  <div className="w-[8mm] h-[8mm] rounded-full bg-teal-500 opacity-70 mt-3" />
                </div>
              </div>
            </div>
          </div>
          <PageFooter organizationName={data.meta.organizationName} pageNum={3} section="Executive Summary" />
        </div>

        {/* ════════════════════════════════════════════════════════
            PAGE 5 — SCHOLARSHIP & EDUCATION
        ════════════════════════════════════════════════════════ */}
        <div className="page bg-white">
          <div className="absolute top-0 inset-x-0 h-[3px] bg-orange-500" />
          <div className="page-content">
            <SectionHeader accent="orange">Scholarship &amp; Education Support</SectionHeader>

            {/* Stat tiles — 2×2 */}
            <div className="grid grid-cols-2 gap-[4mm] mb-[8mm]">
              {data.scholarship.stats.map((stat, i) => (
                <StatCard key={i} stat={stat} editMode={e}
                  onChangeValue={v => { const n = data.scholarship.stats.map((s, j) => j === i ? { ...s, value: v } : s); updateField("scholarship.stats", n); }}
                  onChangeLabel={v => { const n = data.scholarship.stats.map((s, j) => j === i ? { ...s, label: v } : s); updateField("scholarship.stats", n); }}
                />
              ))}
            </div>

            <div className="h-[1px] bg-gray-100 mb-[6mm]" />

            <EditableText value={data.scholarship.description} onChange={v => updateField("scholarship.description", v)} editMode={e} tag="p" className="text-gray-600 text-[9.5pt] leading-relaxed mb-[8mm]" />

            {/* Self-Sustaining Schools */}
            <div className="border-l-[3px] border-teal-500 pl-[5mm] mb-[6mm]">
              <SectionHeader accent="teal" size="md">Self-Sustaining Schools Initiative</SectionHeader>
              <EditableText value={data.selfSustaining.description} onChange={v => updateField("selfSustaining.description", v)} editMode={e} tag="p" className="text-gray-700 text-[9pt] leading-relaxed font-semibold mb-4" />
            </div>

            <div className="grid grid-cols-[1fr_1fr] gap-[6mm]">
              <div>
                <p className="text-[7.5pt] font-black text-gray-400 uppercase tracking-widest mb-3">Key focus areas</p>
                <div className="space-y-2">
                  {data.selfSustaining.focusAreas.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-[5mm] h-[5mm] rounded-full bg-orange-500 text-white flex items-center justify-center text-[6pt] font-black flex-shrink-0">{i + 1}</span>
                      <EditableText value={item}
                        onChange={v => { const n = [...data.selfSustaining.focusAreas]; n[i] = v; updateField("selfSustaining.focusAreas", n); }}
                        editMode={e} tag="span" className="text-gray-800 text-[9pt] font-semibold leading-snug"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[7.5pt] font-black text-gray-400 uppercase tracking-widest mb-3">Progress this quarter</p>
                <div className="space-y-3">
                  {data.selfSustaining.progress.map((item, i) => (
                    <div key={i} className="bg-gray-900 text-white rounded p-[4mm] flex items-center">
                      <EditableText value={item}
                        onChange={v => { const n = [...data.selfSustaining.progress]; n[i] = v; updateField("selfSustaining.progress", n); }}
                        editMode={e} tag="p" className="text-[9pt] font-black leading-tight"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <PageFooter organizationName={data.meta.organizationName} pageNum={4} section="Scholarship & Education" />
        </div>

        {/* ════════════════════════════════════════════════════════
            PAGE 6 — SCHOOL-BASED IMPACT (chapter opener)
        ════════════════════════════════════════════════════════ */}
        <div className="page" style={{ background: "#1a1a2e" }}>
          <div className="absolute inset-0">
            {/* Geometric */}
            <div className="absolute bottom-0 left-0 right-0 h-[80mm]" style={{ background: "rgba(249,115,22,0.07)" }} />
            <div className="absolute top-[30mm] right-[10mm] w-[40mm] h-[40mm] rounded-full" style={{ background: "rgba(249,115,22,0.3)" }} />
            <div className="absolute top-[50mm] right-[28mm] w-[20mm] h-[20mm] rounded-full" style={{ background: "rgba(13,148,136,0.5)" }} />
            <div className="absolute top-[60mm] right-[18mm] w-[8mm] h-[8mm] rounded-full" style={{ background: "rgba(249,115,22,0.8)" }} />
            <div className="absolute bottom-[20mm] left-[10mm] w-[30mm] h-[30mm] rounded-full" style={{ background: "rgba(13,148,136,0.2)" }} />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center px-[14mm]">
            <p className="text-orange-500 text-[8pt] font-black uppercase tracking-widest mb-4">Section 03</p>
            <h2 className="text-white font-black leading-none mb-6" style={{ fontSize: "44pt" }}>
              SCHOOL-BASED<br />
              <span style={{ color: "#f97316" }}>IMPACT</span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-[12mm] bg-orange-500" />
              <p className="text-white/40 text-[9pt] italic">Stories of transformation from our partner schools</p>
            </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-[3px] bg-orange-500" />
        </div>

        {/* ════════════════════════════════════════════════════════
            PAGE 7 — SCHOOL PROFILES
        ════════════════════════════════════════════════════════ */}
        <div className="page bg-white">
          <div className="absolute top-0 left-0 w-[3px] h-full bg-orange-500" />
          <div className="page-content" style={{ left: "3px", paddingLeft: "11mm" }}>
            <SectionHeader accent="orange">School Profiles</SectionHeader>
            <div className="space-y-[5mm]">
              {data.schoolImpact.schools.map((school, i) => (
                <SchoolCard key={i} school={school} editMode={e}
                  onChangeName={v => { const n = data.schoolImpact.schools.map((s, j) => j === i ? { ...s, name: v } : s); updateField("schoolImpact.schools", n); }}
                  onChangePoints={v => { const n = data.schoolImpact.schools.map((s, j) => j === i ? { ...s, points: v } : s); updateField("schoolImpact.schools", n); }}
                  onChangeFootnote={v => { const n = data.schoolImpact.schools.map((s, j) => j === i ? { ...s, footnote: v } : s); updateField("schoolImpact.schools", n); }}
                />
              ))}
            </div>
          </div>
          <PageFooter organizationName={data.meta.organizationName} pageNum={5} section="School-Based Impact" />
        </div>

        {/* ════════════════════════════════════════════════════════
            PAGE 8 — INNOVATION CHAPTER + PROGRESS
        ════════════════════════════════════════════════════════ */}
        <div className="page bg-white">
          {/* Split top: dark left, orange right */}
          <div className="absolute top-0 left-0 right-0 h-[30mm] flex">
            <div className="flex-1 bg-gray-900 flex items-center px-[12mm]">
              <div>
                <p className="text-orange-500 text-[7pt] font-black uppercase tracking-widest mb-1">Section 04</p>
                <h2 className="text-white font-black text-[16pt] leading-none">Innovation &amp;<br />Technology</h2>
              </div>
            </div>
            <div className="w-[40mm] bg-orange-500 flex items-center justify-center">
              <span className="text-white font-black text-[28pt] opacity-40">04</span>
            </div>
          </div>

          <div className="page-content" style={{ top: "33mm" }}>
            <p className="text-[7.5pt] font-black text-gray-400 uppercase tracking-widest mb-[5mm]">Progress To Date</p>

            {/* Big stat tiles — horizontal */}
            <div className="grid grid-cols-3 gap-[4mm] mb-[7mm]">
              {data.innovationProgress.stats.map((stat, i) => (
                <StatCard key={i} stat={stat} editMode={e}
                  onChangeValue={v => { const n = data.innovationProgress.stats.map((s, j) => j === i ? { ...s, value: v } : s); updateField("innovationProgress.stats", n); }}
                  onChangeLabel={v => { const n = data.innovationProgress.stats.map((s, j) => j === i ? { ...s, label: v } : s); updateField("innovationProgress.stats", n); }}
                />
              ))}
            </div>

            <EditableText value={data.innovationProgress.description} onChange={v => updateField("innovationProgress.description", v)} editMode={e} tag="p" className="text-gray-600 text-[9pt] leading-relaxed mb-[7mm]" />

            <div className="h-[1px] bg-gray-100 mb-[6mm]" />

            <SectionHeader accent="orange" size="md">Key Developments This Quarter</SectionHeader>
            <div className="grid grid-cols-2 gap-[4mm] mb-[5mm]">
              {data.keyDevelopments.schools.map((school, i) => (
                <SchoolCard key={i} school={school} editMode={e}
                  onChangeName={v => { const n = data.keyDevelopments.schools.map((s, j) => j === i ? { ...s, name: v } : s); updateField("keyDevelopments.schools", n); }}
                  onChangePoints={v => { const n = data.keyDevelopments.schools.map((s, j) => j === i ? { ...s, points: v } : s); updateField("keyDevelopments.schools", n); }}
                />
              ))}
            </div>
            <div className="bg-teal-50 border-l-[3px] border-teal-500 px-[5mm] py-[3mm]">
              <p className="text-[7.5pt] font-black text-teal-700 uppercase tracking-widest mb-2">Impact</p>
              <div className="space-y-1.5">
                {data.keyDevelopments.impact.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-[4mm] h-[4mm] rounded-full bg-teal-500 mt-[2px] flex-shrink-0" />
                    <EditableText value={item}
                      onChange={v => { const n = [...data.keyDevelopments.impact]; n[i] = v; updateField("keyDevelopments.impact", n); }}
                      editMode={e} tag="span" className="text-teal-900 text-[8.5pt] leading-snug"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <PageFooter organizationName={data.meta.organizationName} pageNum={6} section="Innovation & Technology" />
        </div>

        {/* ════════════════════════════════════════════════════════
            PAGE 9 — BENEFICIARY STORY
        ════════════════════════════════════════════════════════ */}
        <div className="page" style={{ background: "#f0fdfa" }}>
          {/* Accent top band */}
          <div className="absolute top-0 inset-x-0 h-[3px] bg-teal-500" />
          <div className="absolute top-[3px] inset-x-0 h-[1px] bg-teal-200" />

          <div className="page-content">
            <div className="flex items-center gap-3 mb-[6mm]">
              <div className="w-[8mm] h-[8mm] rounded-full bg-teal-500 flex items-center justify-center text-white text-[7pt] font-black">★</div>
              <SectionHeader accent="teal">Beneficiary Story</SectionHeader>
            </div>

            <div className="grid grid-cols-[55mm_1fr] gap-[8mm]">
              {/* Photo */}
              <div>
                <EditableImage
                  alt={`${data.beneficiaryStory.name} portrait`}
                  className="w-full overflow-hidden rounded"
                  editMode={e}
                  image={data.beneficiaryStory.image}
                  imageClassName="h-full w-full object-cover"
                  onRemove={() => clearImage("beneficiaryStory.image")}
                  onUpload={file => uploadImage("beneficiaryStory.image", file)}
                  placeholder={
                    <div className="flex w-full flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-center" style={{ aspectRatio: "4/5" }}>
                      <div className="mb-3 rounded-full border border-white/70 bg-white/70 px-4 py-1.5 text-[7pt] font-black uppercase tracking-[0.28em] text-gray-500">
                        Story photo
                      </div>
                      <p className="max-w-[38mm] text-[8pt] font-medium leading-relaxed text-gray-500">
                        Upload a beneficiary portrait or supporting image.
                      </p>
                    </div>
                  }
                  uploading={isUploading("beneficiaryStory.image")}
                >
                  <div className="absolute inset-x-0 bottom-0 bg-gray-900/85 text-white px-3 py-2">
                    <EditableText value={data.beneficiaryStory.name} onChange={v => updateField("beneficiaryStory.name", v)} editMode={e} tag="p" className="font-black text-[9pt] text-center" multiline={false} />
                  </div>
                </EditableImage>
                {/* Pull quote decoration */}
                <div className="mt-4 text-teal-400 font-black" style={{ fontSize: "36pt", lineHeight: 1 }}>&ldquo;</div>
              </div>

              {/* Story */}
              <div className="flex flex-col justify-center">
                <div className="w-[6mm] h-[2px] bg-teal-500 mb-4" />
                {data.beneficiaryStory.paragraphs.map((para, i) => (
                  <EditableText key={i} value={para}
                    onChange={v => { const n = [...data.beneficiaryStory.paragraphs]; n[i] = v; updateField("beneficiaryStory.paragraphs", n); }}
                    editMode={e} tag="p"
                    className={`text-[9.5pt] leading-relaxed mb-4 ${
                      i === 1
                        ? "text-teal-800 font-semibold italic border-l-[2px] border-teal-400 pl-3"
                        : "text-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <PageFooter organizationName={data.meta.organizationName} pageNum={7} section="Beneficiary Story" />
        </div>

        {/* ════════════════════════════════════════════════════════
            PAGE 10 — QUARTERLY HIGHLIGHTS
        ════════════════════════════════════════════════════════ */}
        <div className="page bg-white">
          <div className="absolute top-0 inset-x-0 h-[3px] bg-orange-500" />
          <div className="page-content">
            <SectionHeader accent="orange">Quarterly Highlights</SectionHeader>
            <div className="grid grid-cols-2 gap-[3mm]">
              {data.quarterlyHighlights.map((item, i) => (
                <div key={i} className="flex items-start gap-[3mm] bg-gray-50 border border-gray-100 rounded px-[4mm] py-[3mm]">
                  <span className="w-[6mm] h-[6mm] rounded-full bg-orange-500 text-white flex items-center justify-center text-[7pt] font-black flex-shrink-0">
                    {i + 1}
                  </span>
                  <EditableText value={item}
                    onChange={v => { const n = [...data.quarterlyHighlights]; n[i] = v; updateField("quarterlyHighlights", n); }}
                    editMode={e} tag="span" className="text-gray-800 text-[9pt] font-semibold leading-snug"
                    multiline={false}
                  />
                  {editMode && (
                    <button onClick={() => updateField("quarterlyHighlights", data.quarterlyHighlights.filter((_, j) => j !== i))} className="screen-only ml-auto text-red-400 text-[8pt]">✕</button>
                  )}
                </div>
              ))}
              {editMode && (
                <button onClick={() => updateField("quarterlyHighlights", [...data.quarterlyHighlights, "New highlight"])} className="screen-only flex items-center gap-2 bg-orange-50 border border-dashed border-orange-300 rounded px-[4mm] py-[3mm] text-orange-500 text-[8.5pt] font-semibold">
                  + Add
                </button>
              )}
            </div>

            {/* Conclusion block */}
            <div className="mt-[8mm]">
              <div className="h-[1px] bg-gray-100 mb-[6mm]" />
              <div className="bg-gray-900 text-white rounded p-[7mm]">
                <div className="w-[6mm] h-[2px] bg-orange-500 mb-4" />
                <h2 className="text-white font-black text-[16pt] mb-4">Conclusion</h2>
                <div className="grid grid-cols-2 gap-[6mm]">
                  <div>
                    <EditableText value={data.conclusion.body} onChange={v => updateField("conclusion.body", v)} editMode={e} tag="p" className="text-white/75 text-[9pt] leading-relaxed mb-4" />
                    <p className="text-white/40 text-[7pt] font-black uppercase tracking-widest mb-3">Schools are increasingly:</p>
                    <div className="space-y-2">
                      {data.conclusion.points.map((pt, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-[3mm] h-[3mm] rounded-full bg-orange-500 flex-shrink-0" />
                          <EditableText value={pt}
                            onChange={v => { const n = [...data.conclusion.points]; n[i] = v; updateField("conclusion.points", n); }}
                            editMode={e} tag="span" className="text-white/85 text-[9pt] font-semibold"
                            multiline={false}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-l border-teal-500/30 pl-[6mm]">
                    <EditableText value={data.conclusion.closing} onChange={v => updateField("conclusion.closing", v)} editMode={e} tag="p" className="text-white/60 text-[9pt] leading-relaxed italic" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PageFooter organizationName={data.meta.organizationName} pageNum={8} section="Highlights & Conclusion" />
        </div>

        {/* ════════════════════════════════════════════════════════
            PAGE 11 — PHOTOS
        ════════════════════════════════════════════════════════ */}
        <div className="page" style={{ background: design.photo.pageBackground }}>
          <div
            className="absolute inset-0"
            style={{
              background: design.photo.pageOverlay,
            }}
          />
          <div className="absolute top-0 inset-x-0 h-[4px] bg-orange-500" />
          <div className="absolute top-[12mm] left-[12mm] right-[12mm] flex items-end justify-between gap-[10mm]">
            <div>
              <p className={`mb-2 text-[7pt] font-black uppercase tracking-[0.35em] ${design.photo.eyebrow}`}>Field Notes</p>
              <h2 className="text-[24pt] font-black leading-none text-white">In Pictures</h2>
            </div>
            <p className={`max-w-[62mm] text-right text-[7.7pt] leading-relaxed ${design.photo.intro}`}>
              Snapshots from classrooms, gardens, and infrastructure work across partner schools this quarter.
            </p>
          </div>

          <div className="absolute top-[34mm] left-[12mm] right-[12mm] bottom-[16mm] grid grid-cols-2 gap-[4mm]">
            {data.photos.slice(0, 6).map((photo, i) => (
              <div key={i} className="relative flex flex-col justify-end overflow-hidden rounded-[4mm] border border-white/10 bg-slate-800 shadow-[0_16px_30px_rgba(15,23,42,0.25)]">
                <EditableImage
                  alt={photo.caption}
                  className="absolute inset-0"
                  controlsClassName="right-[4mm] top-[4mm]"
                  editMode={e}
                  image={photo.image}
                  imageClassName="absolute inset-0 h-full w-full object-cover"
                  onRemove={() => clearImage(`photos.${i}.image`)}
                  onUpload={file => uploadImage(`photos.${i}.image`, file)}
                  placeholder={
                    <div className="absolute inset-0 flex items-center justify-center px-[5mm]" style={{ background: design.photo.cardGradient }}>
                      <span className={`absolute rounded-full border border-white/10 px-[4mm] py-[1.5mm] text-center text-[6.2pt] font-black uppercase tracking-[0.32em] ${design.photo.placeholderText}`}>
                        {photo.placeholder.replace(/-/g, " ")}
                      </span>
                      <div className="text-center">
                        <div className="mb-2 text-[7pt] font-black uppercase tracking-[0.3em] text-white/40">
                          Photo slot
                        </div>
                        <p className="max-w-[34mm] text-[7.5pt] leading-relaxed text-white/45">
                          Upload a field image for this caption.
                        </p>
                      </div>
                    </div>
                  }
                  uploading={isUploading(`photos.${i}.image`)}
                >
                  {photo.image.url && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  )}
                </EditableImage>
                <div className={`relative mt-auto border-t px-[4mm] py-[3.5mm] ${design.photo.captionPanel}`}>
                  <EditableText value={photo.caption}
                    onChange={v => { const n = data.photos.map((p, j) => j === i ? { ...p, caption: v } : p); updateField("photos", n); }}
                    editMode={e} tag="p" className="text-white text-[7.4pt] font-medium leading-[1.4]"
                  />
                </div>
              </div>
            ))}
          </div>
          <PageFooter organizationName={data.meta.organizationName} pageNum={9} section="In Pictures" theme={design.photo.footerTheme} />
        </div>

        {/* ════════════════════════════════════════════════════════
            PAGE 12 — THANK YOU + CONTACTS
        ════════════════════════════════════════════════════════ */}
        <div className="page" style={{ background: design.thankYou.pageBackground }}>
          <div className="absolute inset-0" style={{ background: design.thankYou.pageOverlay }} />
          <div className="absolute top-0 inset-x-0 h-[4px] bg-orange-500" />
          <div className={`absolute top-[12mm] right-[10mm] h-[44mm] w-[44mm] rounded-full ${design.thankYou.orbOne}`} />
          <div className={`absolute bottom-[18mm] left-[-10mm] h-[42mm] w-[42mm] rounded-full ${design.thankYou.orbTwo}`} />
          <div className="absolute top-[14mm] left-[12mm] right-[12mm] grid grid-cols-[1.2fr_0.8fr] items-start gap-[8mm]">
            <div>
              <p className={`mb-2 text-[7pt] font-black uppercase tracking-[0.35em] ${design.thankYou.kicker}`}>With Gratitude</p>
              <h2 className="text-gray-900 font-black leading-none" style={{ fontSize: "40pt" }}>
                Thank
                <br />
                You
              </h2>
              <div className="mt-[4mm] h-[2px] w-[18mm] bg-orange-500" />
              <EditableText
                value={data.meta.tagline}
                onChange={v => updateField("meta.tagline", v)}
                editMode={e}
                tag="p"
                className="mt-[4mm] max-w-[82mm] text-[9pt] font-medium italic leading-relaxed text-gray-600"
                multiline={false}
              />
            </div>

            <div className={`rounded-[4mm] px-[6mm] py-[5mm] ${design.thankYou.preparedByCard}`}>
              <p className={`mb-2 text-[6.8pt] font-black uppercase tracking-[0.28em] ${design.thankYou.preparedByEyebrow}`}>Prepared by</p>
              <EditableText
                value={data.meta.preparedBy}
                onChange={v => updateField("meta.preparedBy", v)}
                editMode={e}
                tag="p"
                className="text-[13pt] font-black leading-tight"
                multiline={false}
              />
              <p className={`mt-2 text-[7.6pt] leading-relaxed ${design.thankYou.preparedByNote}`}>{data.meta.organizationName}</p>
            </div>
          </div>

          <div className="page-content flex flex-col gap-[6mm]" style={{ top: "62mm" }}>
            <div className="grid grid-cols-[1.2fr_0.8fr] gap-[8mm]">
              <div className={`rounded-[4mm] border px-[7mm] py-[7mm] ${design.thankYou.messageCard}`}>
                <div className="space-y-4">
                  {data.thankYou.paragraphs.map((para, i) => (
                    <EditableText
                      key={i}
                      value={para}
                      onChange={v => {
                        const n = [...data.thankYou.paragraphs];
                        n[i] = v;
                        updateField("thankYou.paragraphs", n);
                      }}
                      editMode={e}
                      tag="p"
                      className={`leading-relaxed ${
                        i === 0 ? "text-[10pt] font-semibold text-gray-900" : "text-[9pt] text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
              {/* Contact info */}
              <div className={`rounded-[4mm] border px-[6mm] py-[6mm] ${design.thankYou.contactCard}`}>
                <p className={`mb-5 text-[7pt] font-black uppercase tracking-[0.32em] ${design.thankYou.contactEyebrow}`}>Contact</p>
                <div className="space-y-4">
                  {[
                    { icon: "📞", label: "Phone", field: "contacts.phone" as const, value: data.contacts.phone },
                    { icon: "📍", label: "Address", field: "contacts.address" as const, value: data.contacts.address },
                    { icon: "🌐", label: "Website", field: "contacts.website" as const, value: data.contacts.website },
                  ].map(({ icon, label, field, value }) => (
                    <div key={label} className="rounded-[3mm] border border-gray-100 bg-gray-50 px-[4mm] py-[4mm]">
                      <div className="flex items-start gap-[3mm]">
                        <div className={`flex h-[10mm] w-[10mm] flex-shrink-0 items-center justify-center rounded-[2.5mm] text-[7pt] font-black ${design.thankYou.contactIcon}`}>{icon}</div>
                        <div className="min-w-0">
                          <p className="mb-1 text-[6.5pt] font-black uppercase tracking-[0.28em] text-gray-400">{label}</p>
                          <EditableText value={value} onChange={v => updateField(field, v)} editMode={e} tag="p" className="text-[9pt] font-semibold leading-snug text-gray-900" multiline={false} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`rounded-[4mm] px-[7mm] py-[5mm] ${design.thankYou.closingCard}`}>
              <div className="flex items-start justify-between gap-[8mm]">
                <div>
                  <p className={`mb-2 text-[6.6pt] font-black uppercase tracking-[0.3em] ${design.thankYou.closingEyebrow}`}>Closing Note</p>
                  <EditableText value={data.conclusion.closing} onChange={v => updateField("conclusion.closing", v)} editMode={e} tag="p" className="max-w-[120mm] text-[8.9pt] italic leading-relaxed text-white/75" />
                </div>
                <div className="flex gap-1.5 pt-1">
                  <div className="h-[4mm] w-[4mm] rounded-full bg-orange-500" />
                  <div className="h-[4mm] w-[4mm] rounded-full bg-teal-500" />
                </div>
              </div>
            </div>
          </div>
          <PageFooter organizationName={data.meta.organizationName} pageNum={10} section="Thank You & Contacts" />
        </div>

      </div>

      {/* ── Screen-only tip ─────────────────────────────────────── */}
      {!editMode && (
        <div className={`screen-only text-center py-4 text-xs ${design.screen.tip}`}>
          In the print dialog: set <strong>Margins → None</strong> and enable <strong>Background graphics</strong> for full color.
        </div>
      )}
      <ThemeSwitcherModal
        currentTheme={design.slug}
        isOpen={isThemeModalOpen}
        isPending={isThemePending}
        onClose={() => setIsThemeModalOpen(false)}
        onSelect={handleThemeSelect}
      />
    </>
  );
}

function getSyncBadge(saveState: "loading" | "idle" | "saving" | "saved" | "error", errorMessage: string | null) {
  if (saveState === "loading") {
    return {
      className: "bg-white/10 text-white/70",
      label: "Loading",
    };
  }

  if (saveState === "saving") {
    return {
      className: "bg-amber-500/15 text-amber-200",
      label: "Saving",
    };
  }

  if (saveState === "saved" || saveState === "idle") {
    return {
      className: "bg-emerald-500/15 text-emerald-200",
      label: "Synced",
    };
  }

  return {
    className: "bg-red-500/15 text-red-200",
    label: errorMessage ? "Sync error" : "Offline",
  };
}
