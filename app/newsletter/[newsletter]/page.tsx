import { notFound, redirect } from "next/navigation";
import Newsletter from "@/app/components/Newsletter";
import NewsletterSleek from "@/app/components/NewsletterSleek";
import {
  defaultNewsletterTheme,
  getNewsletterReport,
  getNewsletterTheme,
  newsletterReports,
} from "@/lib/newsletterDesigns";

export function generateStaticParams() {
  return newsletterReports.map((report) => ({ newsletter: report.slug }));
}

interface Props {
  params: Promise<{ newsletter: string }>;
  searchParams: Promise<{ theme?: string | string[] }>;
}

export default async function NewsletterPage({ params, searchParams }: Props) {
  const { newsletter } = await params;
  const { theme } = await searchParams;
  const themeSlug = Array.isArray(theme) ? theme[0] : theme;

  if (newsletter === "quartely") {
    redirect(themeSlug ? `/newsletter/quarterly?theme=${themeSlug}` : "/newsletter/quarterly");
  }

  const report = getNewsletterReport(newsletter);

  if (!report) {
    notFound();
  }

  if (report.slug === "sleek") {
    return <NewsletterSleek newsletterSlug={report.slug} />;
  }

  const design = getNewsletterTheme(themeSlug ?? "") ?? defaultNewsletterTheme;

  return <Newsletter design={design} newsletterSlug={report.slug} />;
}
