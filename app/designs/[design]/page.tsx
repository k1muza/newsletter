import { notFound, redirect } from "next/navigation";
import { getNewsletterTheme, getNewsletterThemeHref } from "@/lib/newsletterDesigns";

interface Props {
  params: Promise<{ design: string }>;
}

export default async function LegacyDesignPage({ params }: Props) {
  const { design } = await params;

  // "sleek" is a newsletter slug, not a theme.
  if (design === "sleek") {
    redirect("/newsletter/sleek");
  }

  const theme = getNewsletterTheme(design);

  if (!theme) {
    notFound();
  }

  // editorial is the default theme — no query param needed
  redirect(getNewsletterThemeHref("quarterly", theme.slug));
}
