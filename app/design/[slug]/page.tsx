import { notFound } from "next/navigation";
import Newsletter from "@/app/components/Newsletter";
import NewsletterSleek from "@/app/components/NewsletterSleek";
import { defaultNewsletterTheme, getNewsletterTheme } from "@/lib/newsletterDesigns";

export function generateStaticParams() {
  return [{ slug: "quarterly" }, { slug: "sleek" }];
}

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ theme?: string | string[] }>;
}

export default async function DesignPage({ params, searchParams }: Props) {
  const { slug } = await params;

  if (slug === "sleek") {
    return <NewsletterSleek />;
  }

  if (slug === "quarterly") {
    const { theme } = await searchParams;
    const themeSlug = Array.isArray(theme) ? theme[0] : theme;
    const design = getNewsletterTheme(themeSlug ?? "") ?? defaultNewsletterTheme;
    return <Newsletter design={design} />;
  }

  notFound();
}
