/** Reusable running header + footer that appear on every interior page */

interface PageFooterProps {
  pageNum: number;
  section?: string;
  theme?: "light" | "dark";
}

export function PageFooter({ pageNum, section, theme = "light" }: PageFooterProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={`page-footer border-t flex items-center justify-between ${
        isDark ? "border-white/10 bg-slate-950" : "border-gray-200/90 bg-white/90"
      }`}
    >
      <span
        className={`text-[6.8pt] font-semibold uppercase tracking-[0.28em] ${
          isDark ? "text-white/35" : "text-gray-400"
        }`}
      >
        Tererai Trent International Foundation
      </span>
      <div className="flex items-center gap-3">
        {section && (
          <span
            className={`rounded-full border px-3 py-[2px] text-[6.1pt] font-black uppercase tracking-[0.24em] ${
              isDark
                ? "border-white/15 bg-white/5 text-white/55"
                : "border-orange-100 bg-orange-50 text-orange-600"
            }`}
          >
            {section}
          </span>
        )}
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-[7pt] font-bold text-white shadow-sm">
          {pageNum}
        </span>
      </div>
    </div>
  );
}

export function OrangeStripe() {
  return <div className="absolute bottom-[10mm] left-0 right-0 h-[3px] bg-orange-500" />;
}
