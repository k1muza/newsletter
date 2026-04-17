import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Newsletter from "@/app/components/Newsletter";
import { getNewsletterDesign, newsletterDesigns } from "@/lib/newsletterDesigns";

interface DesignPageProps {
  params: Promise<{ design: string }>;
}

export function generateStaticParams() {
  return newsletterDesigns.map((design) => ({ design: design.slug }));
}

export async function generateMetadata({ params }: DesignPageProps): Promise<Metadata> {
  const { design } = await params;
  const selected = getNewsletterDesign(design);

  if (!selected) {
    return {
      title: "Newsletter Design Not Found",
    };
  }

  return {
    title: `${selected.name} · TTI Newsletter`,
    description: selected.description,
  };
}

export default async function DesignPage({ params }: DesignPageProps) {
  const { design } = await params;
  const selected = getNewsletterDesign(design);

  if (!selected) {
    notFound();
  }

  return <Newsletter design={selected} />;
}
