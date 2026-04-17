import Link from "next/link";
import { newsletterReports } from "@/lib/newsletterDesigns";

export const metadata = {
  title: "TTI Foundation — Newsletter Studio",
  description: "Choose a newsletter layout to start editing.",
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-white px-4 py-16">
      {/* Branding */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-[9pt] font-black text-white shadow-lg">
          TTI
        </div>
        <h1 className="text-[30pt] font-black tracking-tight text-slate-900">
          Newsletter Studio
        </h1>
        <p className="mt-3 text-sm font-medium text-slate-500">
          Select a newsletter layout to start editing
        </p>
      </div>

      {/* Newsletter cards */}
      <div className="grid w-full max-w-3xl gap-6 sm:grid-cols-2">
        {newsletterReports.map((report) => (
          <Link
            key={report.slug}
            href={`/newsletter/${report.slug}`}
            className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
          >
            {/* Preview gradient */}
            <div className={`h-36 bg-gradient-to-br ${report.previewAccent}`} />

            <div className="flex flex-1 flex-col gap-3 p-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  {report.tagline}
                </p>
                <h2 className="mt-1.5 text-[20pt] font-black tracking-tight text-slate-950">
                  {report.name}
                </h2>
              </div>

              <p className="text-sm leading-relaxed text-slate-500">
                {report.description}
              </p>

              <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                  {report.themeCount === 1 ? "1 theme" : `${report.themeCount} themes`}
                </span>
                <span className="text-sm font-bold text-orange-500 transition-colors group-hover:text-orange-600">
                  Open →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-12 text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-400">
        Tererai Trent International Foundation
      </p>
    </div>
  );
}
