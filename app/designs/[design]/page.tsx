import { notFound, redirect } from "next/navigation";
import { getNewsletterTheme } from "@/lib/newsletterDesigns";

interface Props {
  params: Promise<{ design: string }>;
}

export default async function LegacyDesignPage({ params }: Props) {
  const { design } = await params;

  // "sleek" is a report slug, not a theme
  if (design === "sleek") {
    redirect("/design/sleek");
  }

  const theme = getNewsletterTheme(design);

  if (!theme) {
    notFound();
  }

  // editorial is the default theme — no query param needed
  redirect(theme.slug === "editorial" ? "/design/quarterly" : `/design/quarterly?theme=${theme.slug}`);
}
