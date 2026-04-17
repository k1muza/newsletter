import { notFound, redirect } from "next/navigation";
import {
  getNewsletterDesign,
  getNewsletterThemeHref,
  newsletterDesigns,
} from "@/lib/newsletterDesigns";

interface DesignPageProps {
  params: Promise<{ design: string }>;
}

export function generateStaticParams() {
  return newsletterDesigns.map((design) => ({ design: design.slug }));
}

export default async function DesignPage({ params }: DesignPageProps) {
  const { design } = await params;
  const selected = getNewsletterDesign(design);

  if (!selected) {
    notFound();
  }

  redirect(getNewsletterThemeHref(selected.slug));
}
