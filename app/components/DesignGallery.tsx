import { defaultNewsletterDesign, newsletterDesigns } from "@/lib/newsletterDesigns";

interface DesignGalleryProps {
  title?: string;
  eyebrow?: string;
}

export function DesignGallery({
  title = "Newsletter Designs",
  eyebrow = "Route-Based Templates",
}: DesignGalleryProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff7ed_0,#f8fafc_42%,#e2e8f0_100%)] px-6 py-10 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-[0_30px_70px_rgba(15,23,42,0.10)] backdrop-blur">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-orange-500">{eyebrow}</p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Each route renders the same editable newsletter content with a different presentation. That means you
                can switch between designs without losing copy edits.
              </p>
            </div>
            <a
              href={defaultNewsletterDesign.route}
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Open Default Design
            </a>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {newsletterDesigns.map((design) => (
            <a
              key={design.slug}
              href={design.route}
              className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
            >
              <div className={`h-36 bg-gradient-to-br ${design.previewAccent}`} />
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.28em] text-slate-400">{design.slug}</p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{design.name}</h2>
                  </div>
                  <span className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-slate-500">
                    {design.route}
                  </span>
                </div>

                <p className="text-sm leading-7 text-slate-600">{design.description}</p>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Shared content store
                  </span>
                  <span className="text-sm font-bold text-orange-500 transition group-hover:text-orange-600">
                    Open design
                  </span>
                </div>
              </div>
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}
