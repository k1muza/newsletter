// ── Themes ────────────────────────────────────────────────────────────────────
// A "theme" changes the visual look of a newsletter without altering its structure.

export interface ThemeSwitcherOption<TThemeSlug extends string = string> {
  slug: TThemeSlug;
  name: string;
  description: string;
  previewAccent: string;
}

export type NewsletterThemeSlug = "editorial" | "terracotta";
export type ResilienceThemeSlug = "heritage" | "canopy" | "sunrise";
export type NewsletterSlug = "quarterly" | "sleek" | "resilience";

export interface NewsletterDesignDefinition
  extends ThemeSwitcherOption<NewsletterThemeSlug> {
  screen: {
    toolbar: string;
    subtitle: string;
    reset: string;
    editActive: string;
    editInactive: string;
    print: string;
    editingBackground: string;
    viewingBackground: string;
    tip: string;
  };
  cover: {
    pageBackground: string;
    triangleBackground: string;
    largeCircleBackground: string;
    smallCircleBackground: string;
    bottomGlowBackground: string;
    logoDot: string;
    badge: string;
    badgeRule: string;
    headlineAccent: string;
    tagline: string;
    dividerLead: string;
    dividerDot: string;
    dividerTrail: string;
    preparedByLine: string;
  };
  photo: {
    pageBackground: string;
    pageOverlay: string;
    eyebrow: string;
    intro: string;
    cardGradient: string;
    placeholderText: string;
    captionPanel: string;
    footerTheme: "light" | "dark";
  };
  thankYou: {
    pageBackground: string;
    pageOverlay: string;
    orbOne: string;
    orbTwo: string;
    kicker: string;
    preparedByCard: string;
    preparedByEyebrow: string;
    preparedByNote: string;
    messageCard: string;
    contactCard: string;
    contactEyebrow: string;
    contactIcon: string;
    closingCard: string;
    closingEyebrow: string;
  };
}

export interface ResilienceThemeDefinition
  extends ThemeSwitcherOption<ResilienceThemeSlug> {
  colors: {
    forest: string;
    forestDeep: string;
    moss: string;
    clay: string;
    amber: string;
    sand: string;
    paper: string;
    ink: string;
    inkMid: string;
    inkLight: string;
    highlight: string;
    headingFont: string;
  };
}

export const newsletterThemes: NewsletterDesignDefinition[] = [
  {
    slug: "editorial",
    name: "Editorial Print",
    description: "Bold magazine-style, tuned for strong print presence.",
    previewAccent: "from-slate-900 via-slate-800 to-orange-500",
    screen: {
      toolbar: "bg-gray-900 text-white",
      subtitle: "text-gray-400",
      reset: "text-red-400 hover:text-red-300",
      editActive: "bg-orange-500 text-white",
      editInactive: "bg-gray-700 text-gray-200 hover:bg-gray-600",
      print: "bg-teal-600 text-white hover:bg-teal-500",
      editingBackground: "bg-amber-50/60",
      viewingBackground: "bg-gray-200",
      tip: "bg-gray-200 text-gray-500",
    },
    cover: {
      pageBackground: "#1a1a2e",
      triangleBackground: "rgba(249,115,22,0.10)",
      largeCircleBackground: "rgba(249,115,22,0.55)",
      smallCircleBackground: "rgba(13,148,136,0.70)",
      bottomGlowBackground: "rgba(249,115,22,0.08)",
      logoDot: "bg-teal-500",
      badge: "bg-orange-500 text-white",
      badgeRule: "bg-orange-500/50",
      headlineAccent: "#f97316",
      tagline: "text-white/50",
      dividerLead: "bg-orange-500",
      dividerDot: "bg-orange-500",
      dividerTrail: "bg-white/10",
      preparedByLine: "bg-orange-500",
    },
    photo: {
      pageBackground: "#0f172a",
      pageOverlay:
        "radial-gradient(circle at top right, rgba(249,115,22,0.16), transparent 26%), radial-gradient(circle at bottom left, rgba(13,148,136,0.18), transparent 32%)",
      eyebrow: "text-orange-400",
      intro: "text-white/60",
      cardGradient:
        "radial-gradient(circle at top right, rgba(249,115,22,0.18), transparent 38%), linear-gradient(155deg, rgba(15,23,42,0.98), rgba(30,41,59,0.94))",
      placeholderText: "text-white/30",
      captionPanel: "border-white/10 bg-black/25",
      footerTheme: "dark",
    },
    thankYou: {
      pageBackground: "#fffaf4",
      pageOverlay:
        "radial-gradient(circle at top right, rgba(249,115,22,0.12), transparent 28%), radial-gradient(circle at bottom left, rgba(13,148,136,0.12), transparent 30%)",
      orbOne: "bg-orange-100",
      orbTwo: "bg-teal-50",
      kicker: "text-teal-700",
      preparedByCard: "bg-gray-900 text-white shadow-[0_18px_36px_rgba(15,23,42,0.18)]",
      preparedByEyebrow: "text-orange-400",
      preparedByNote: "text-white/55",
      messageCard: "border-orange-100 bg-white shadow-[0_12px_30px_rgba(148,163,184,0.12)]",
      contactCard: "border-gray-200 bg-white shadow-[0_12px_30px_rgba(148,163,184,0.1)]",
      contactEyebrow: "text-gray-400",
      contactIcon: "bg-gray-900 text-white",
      closingCard: "bg-gray-900 text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]",
      closingEyebrow: "text-white/35",
    },
  },
  {
    slug: "terracotta",
    name: "Terracotta Folio",
    description: "Warmer, softer tones — clay, cream, and forest for a report-like feel.",
    previewAccent: "from-amber-200 via-orange-300 to-emerald-700",
    screen: {
      toolbar: "bg-stone-100 text-stone-900 border-b border-stone-200",
      subtitle: "text-stone-500",
      reset: "text-rose-500 hover:text-rose-600",
      editActive: "bg-emerald-700 text-white",
      editInactive: "bg-white text-stone-700 border border-stone-300 hover:bg-stone-50",
      print: "bg-orange-500 text-white hover:bg-orange-600",
      editingBackground: "bg-orange-50",
      viewingBackground: "bg-stone-200",
      tip: "bg-stone-200 text-stone-600",
    },
    cover: {
      pageBackground: "#31241f",
      triangleBackground: "rgba(251,191,36,0.10)",
      largeCircleBackground: "rgba(251,146,60,0.55)",
      smallCircleBackground: "rgba(5,150,105,0.55)",
      bottomGlowBackground: "rgba(255,237,213,0.06)",
      logoDot: "bg-orange-400",
      badge: "bg-emerald-700 text-white",
      badgeRule: "bg-orange-300/60",
      headlineAccent: "#fbbf24",
      tagline: "text-orange-100/70",
      dividerLead: "bg-orange-300",
      dividerDot: "bg-emerald-500",
      dividerTrail: "bg-white/15",
      preparedByLine: "bg-orange-300",
    },
    photo: {
      pageBackground: "#1f2a24",
      pageOverlay:
        "radial-gradient(circle at top right, rgba(251,146,60,0.18), transparent 28%), radial-gradient(circle at bottom left, rgba(245,158,11,0.18), transparent 30%)",
      eyebrow: "text-orange-300",
      intro: "text-orange-50/70",
      cardGradient:
        "radial-gradient(circle at top right, rgba(251,146,60,0.22), transparent 38%), linear-gradient(155deg, rgba(30,41,32,0.98), rgba(55,65,50,0.94))",
      placeholderText: "text-orange-100/35",
      captionPanel: "border-orange-100/10 bg-stone-950/35",
      footerTheme: "dark",
    },
    thankYou: {
      pageBackground: "#fff7ed",
      pageOverlay:
        "radial-gradient(circle at top right, rgba(251,146,60,0.16), transparent 28%), radial-gradient(circle at bottom left, rgba(16,185,129,0.12), transparent 30%)",
      orbOne: "bg-orange-200/70",
      orbTwo: "bg-emerald-100",
      kicker: "text-orange-700",
      preparedByCard: "bg-emerald-800 text-white shadow-[0_18px_36px_rgba(22,101,52,0.18)]",
      preparedByEyebrow: "text-orange-200",
      preparedByNote: "text-white/65",
      messageCard: "border-orange-200 bg-amber-50/70 shadow-[0_12px_30px_rgba(180,83,9,0.10)]",
      contactCard: "border-orange-100 bg-white/95 shadow-[0_12px_30px_rgba(180,83,9,0.08)]",
      contactEyebrow: "text-orange-700/60",
      contactIcon: "bg-orange-500 text-white",
      closingCard: "bg-stone-900 text-white shadow-[0_18px_40px_rgba(41,37,36,0.16)]",
      closingEyebrow: "text-orange-100/45",
    },
  },
];

export const defaultNewsletterTheme = newsletterThemes[0];

export const resilienceThemes: ResilienceThemeDefinition[] = [
  {
    slug: "heritage",
    name: "Heritage Ledger",
    description: "The original warm editorial look with deep forest, clay, and gold accents.",
    previewAccent: "from-[#173f35] via-[#2d6a4f] to-[#d8a13f]",
    colors: {
      forest: "#173f35",
      forestDeep: "#0d2a23",
      moss: "#2d6a4f",
      clay: "#c96f4d",
      amber: "#d8a13f",
      sand: "#f4ede3",
      paper: "#fffaf3",
      ink: "#1f2933",
      inkMid: "#52606d",
      inkLight: "#7b8794",
      highlight: "#f7c88d",
      headingFont: 'Georgia, "Times New Roman", serif',
    },
  },
  {
    slug: "canopy",
    name: "Canopy Journal",
    description: "A cooler evergreen palette with soft sage neutrals and quieter contrast.",
    previewAccent: "from-[#08261d] via-[#35755e] to-[#d4b15a]",
    colors: {
      forest: "#0f3b2f",
      forestDeep: "#08261d",
      moss: "#35755e",
      clay: "#8c5a3c",
      amber: "#d4b15a",
      sand: "#edf0e7",
      paper: "#fbfdf7",
      ink: "#1b2d29",
      inkMid: "#506662",
      inkLight: "#7c8b86",
      highlight: "#dbe7c4",
      headingFont: "Cambria, Georgia, serif",
    },
  },
  {
    slug: "sunrise",
    name: "Sunrise Review",
    description: "A softer clay-and-honey treatment that feels warmer and more ceremonial.",
    previewAccent: "from-[#40271d] via-[#d97941] to-[#f0b95c]",
    colors: {
      forest: "#4a352c",
      forestDeep: "#2a1a16",
      moss: "#7b5a43",
      clay: "#d97941",
      amber: "#f0b95c",
      sand: "#f7ead8",
      paper: "#fff8f0",
      ink: "#36291f",
      inkMid: "#6f5b48",
      inkLight: "#a19080",
      highlight: "#ffd8a8",
      headingFont: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
    },
  },
];

export function getNewsletterTheme(slug: string): NewsletterDesignDefinition | undefined {
  return newsletterThemes.find((t) => t.slug === slug);
}

export const defaultResilienceTheme = resilienceThemes[0];

export function getResilienceTheme(slug: string): ResilienceThemeDefinition | undefined {
  return resilienceThemes.find((theme) => theme.slug === slug);
}

/** URL for switching theme within a newsletter route. */
export function getNewsletterThemeHref(
  newsletterSlug: NewsletterSlug,
  themeSlug: NewsletterThemeSlug
): string {
  return themeSlug === "editorial"
    ? `/newsletter/${newsletterSlug}`
    : `/newsletter/${newsletterSlug}?theme=${themeSlug}`;
}

/** URL for switching theme within the resilience report. */
export function getResilienceThemeHref(themeSlug: ResilienceThemeSlug): string {
  return themeSlug === defaultResilienceTheme.slug
    ? "/newsletter/resilience"
    : `/newsletter/resilience?theme=${themeSlug}`;
}

// ── Reports ───────────────────────────────────────────────────────────────────
// A "newsletter" is a distinct structure / layout. Each lives at its own route.

export interface NewsletterReport {
  slug: NewsletterSlug;
  name: string;
  tagline: string;
  description: string;
  previewAccent: string;
  /** Number of theme variants available for this newsletter. */
  themeCount: number;
}

export const newsletterReports: NewsletterReport[] = [
  {
    slug: "quarterly",
    name: "Quarterly Newsletter",
    tagline: "10-page magazine-style print layout",
    description:
      "Bold, dense editorial layout for quarterly impact reports. Supports two visual themes: Editorial Print and Terracotta Folio.",
    previewAccent: "from-slate-900 via-slate-800 to-orange-500",
    themeCount: 2,
  },
  {
    slug: "sleek",
    name: "Impact Brief",
    tagline: "6-page clean minimal layout",
    description:
      "A minimal, spacious layout with bold type hierarchy and a navy-and-amber palette — designed for focused impact storytelling.",
    previewAccent: "from-[#1e3a5f] via-[#2d5a8e] to-amber-400",
    themeCount: 1,
  },
  {
    slug: "resilience",
    name: "Rural Resilience",
    tagline: "10-page warm editorial report",
    description:
      "A polished long-form layout for scholarship stories, self-sustaining schools, and infrastructure progress across rural communities, now with three switchable themes.",
    previewAccent: "from-[#1b4332] via-[#2d6a4f] to-[#f4a261]",
    themeCount: 3,
  },
];

export function getNewsletterReport(slug: string): NewsletterReport | undefined {
  return newsletterReports.find((report) => report.slug === slug);
}
