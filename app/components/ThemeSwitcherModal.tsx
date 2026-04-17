import {
  newsletterDesigns,
  type NewsletterDesignSlug,
} from "@/lib/newsletterDesigns";

interface ThemeSwitcherModalProps {
  currentTheme: NewsletterDesignSlug;
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
  onSelect: (slug: NewsletterDesignSlug) => void;
}

export function ThemeSwitcherModal({
  currentTheme,
  isOpen,
  isPending,
  onClose,
  onSelect,
}: ThemeSwitcherModalProps) {
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
        className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-[0_40px_120px_rgba(15,23,42,0.35)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-slate-200/80 bg-[radial-gradient(circle_at_top,#fff7ed_0,#ffffff_65%)] px-8 py-6">
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-orange-500">
                Theme Switcher
              </p>
              <h2
                id="theme-switcher-title"
                className="mt-3 text-3xl font-black tracking-tight text-slate-950"
              >
                Choose a newsletter theme
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                Switch styles without leaving the editor. Your copy, image, and
                layout edits stay shared across every theme.
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
          <div className="grid gap-5 md:grid-cols-2">
            {newsletterDesigns.map((design) => {
              const isCurrentTheme = design.slug === currentTheme;

              return (
                <button
                  key={design.slug}
                  type="button"
                  disabled={isPending}
                  onClick={() => onSelect(design.slug)}
                  className={`group flex h-full flex-col overflow-hidden rounded-[1.75rem] border text-left transition duration-200 ${
                    isCurrentTheme
                      ? "border-slate-950 shadow-[0_24px_60px_rgba(15,23,42,0.16)]"
                      : "border-slate-200/80 shadow-[0_18px_50px_rgba(15,23,42,0.08)] hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
                  } ${isPending ? "cursor-wait opacity-80" : ""}`}
                >
                  <div
                    className={`h-36 bg-gradient-to-br ${design.previewAccent}`}
                  />
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-slate-400">
                          {design.slug}
                        </p>
                        <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                          {design.name}
                        </h3>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] ${
                          isCurrentTheme
                            ? "bg-slate-950 text-white"
                            : "border border-slate-200 text-slate-500"
                        }`}
                      >
                        {isCurrentTheme ? "Current" : "Switch"}
                      </span>
                    </div>

                    <p className="text-sm leading-7 text-slate-600">
                      {design.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                        Shared content store
                      </span>
                      <span
                        className={`text-sm font-bold ${
                          isCurrentTheme
                            ? "text-slate-950"
                            : "text-orange-500 group-hover:text-orange-600"
                        }`}
                      >
                        {isCurrentTheme
                          ? "Already active"
                          : isPending
                            ? "Switching..."
                            : "Use this theme"}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            One route, multiple themes.
          </p>
        </div>
      </div>
    </div>
  );
}
