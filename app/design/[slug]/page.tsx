import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ theme?: string | string[] }>;
}

export default async function DesignPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { theme } = await searchParams;
  const themeSlug = Array.isArray(theme) ? theme[0] : theme;
  redirect(themeSlug ? `/newsletter/${slug}?theme=${themeSlug}` : `/newsletter/${slug}`);
}
