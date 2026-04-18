import Link from "next/link";
import type { ReactNode } from "react";

interface AuthPageFrameProps {
  children: ReactNode;
  eyebrow: string;
  homeHref?: string;
  subtitle: string;
  title: string;
}

export function AuthPageFrame({
  children,
  eyebrow,
  homeHref = "/",
  subtitle,
  title,
}: AuthPageFrameProps) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#fff7ed_0,#f8fafc_55%,#e2e8f0_100%)]">
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl" />
      <div className="absolute bottom-12 right-0 h-80 w-80 rounded-full bg-teal-200/40 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
        <div className="flex flex-col justify-between rounded-[2rem] border border-white/50 bg-slate-950 px-8 py-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.28)]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-orange-300">
              Tererai Trent International Foundation
            </p>
            <h1 className="mt-5 max-w-xl text-[clamp(2.4rem,5vw,4.6rem)] font-black leading-[0.95] tracking-tight">
              Newsletter
              <br />
              Studio Access
            </h1>
            <p className="mt-5 max-w-lg text-base leading-8 text-slate-300">
              Secure access for editing, saving, and exporting the newsletter studio.
              Sign in to continue, or create an account when registration is enabled.
            </p>
          </div>

          <div className="mt-10 space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                "Protected editor routes",
                "Private newsletter data",
                "Session-based access",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
            <Link
              href={homeHref}
              className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Return to studio
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-full rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-orange-500">
              {eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
              {title}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
              {subtitle}
            </p>

            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
