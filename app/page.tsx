import Newsletter from "./components/Newsletter";
import {
  defaultNewsletterDesign,
  getNewsletterDesign,
} from "@/lib/newsletterDesigns";

interface HomePageProps {
  searchParams: Promise<{
    theme?: string | string[];
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const { theme } = await searchParams;
  const selectedTheme = Array.isArray(theme) ? theme[0] : theme;
  const design = selectedTheme
    ? getNewsletterDesign(selectedTheme) ?? defaultNewsletterDesign
    : defaultNewsletterDesign;

  return <Newsletter design={design} />;
}
