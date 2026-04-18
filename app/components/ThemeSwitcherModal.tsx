import type { ThemeSwitcherOption } from "@/lib/newsletterDesigns";

interface ThemeSwitcherModalProps<TThemeSlug extends string> {
  currentTheme: TThemeSlug;
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
  onSelect: (slug: TThemeSlug) => void;
  themes: readonly ThemeSwitcherOption<TThemeSlug>[];
}

export function ThemeSwitcherModal<TThemeSlug extends string>({
  currentTheme,
  isOpen,
  isPending,
  onClose,
  onSelect,
  themes,
}: ThemeSwitcherModalProps<TThemeSlug>) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="screen-only fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="theme-switcher-title"
        className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-[0_40px_120px_rgba(15,23,42,0.35)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-slate-200/80 bg-[radial-gradient(circle_at_top,#fff7ed_0,#ffffff_65%)] px-8 py-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-orange-500">
                Theme Switcher
              </p>
              <h2
                id="theme-switcher-title"
                className="mt-3 text-3xl font-black tracking-tight text-slate-950"
              >
                Choose a visual theme
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Themes change the look and feel without altering the report
                structure. Your content is shared across all themes.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
            >
              Close
            </button>
          </div>
        </div>

        <div className="px-8 py-8">
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {themes.map((theme) => {
              const isCurrent = theme.slug === currentTheme;

              return (
                <button
                  key={theme.slug}
                  type="button"
                  disabled={isPending}
                  onClick={() => onSelect(theme.slug)}
                  className={`group flex h-full flex-col overflow-hidden rounded-[1.75rem] border text-left transition duration-200 ${
                    isCurrent
                      ? "border-slate-950 shadow-[0_24px_60px_rgba(15,23,42,0.16)]"
                      : "border-slate-200/80 shadow-[0_18px_50px_rgba(15,23,42,0.08)] hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
                  } ${isPending ? "cursor-wait opacity-80" : ""}`}
                >
                  <div className={`h-28 bg-gradient-to-br ${theme.previewAccent}`} />
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">
                          {theme.slug}
                        </p>
                        <h3 className="mt-1.5 text-xl font-black tracking-tight text-slate-950">
                          {theme.name}
                        </h3>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] ${
                          isCurrent
                            ? "bg-slate-950 text-white"
                            : "border border-slate-200 text-slate-500"
                        }`}
                      >
                        {isCurrent ? "Active" : "Switch"}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {theme.description}
                    </p>
                    <div className="mt-auto border-t border-slate-100 pt-3">
                      <span
                        className={`text-sm font-bold ${
                          isCurrent
                            ? "text-slate-950"
                            : "text-orange-500 group-hover:text-orange-600"
                        }`}
                      >
                        {isCurrent
                          ? "Currently active"
                          : isPending
                            ? "Switching…"
                            : "Use this theme"}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
