import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthPageFrame } from "@/app/components/AuthPageFrame";
import { RegisterForm } from "@/app/components/RegisterForm";
import { isRegistrationEnabled } from "@/lib/auth/env";
import { getSafeRedirectTarget, redirectIfAuthenticated } from "@/lib/auth/server";

interface RegisterPageProps {
  searchParams: Promise<{ next?: string | string[] }>;
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  await redirectIfAuthenticated();

  if (!isRegistrationEnabled()) {
    redirect("/login");
  }

  const { next } = await searchParams;
  const redirectTo = getSafeRedirectTarget(Array.isArray(next) ? next[0] : next);

  return (
    <AuthPageFrame
      eyebrow="Registration"
      title="Create account"
      subtitle="Create a studio account to edit newsletters, upload images, and save documents."
    >
      <RegisterForm redirectTo={redirectTo} />

      <div className="mt-6 border-t border-slate-100 pt-5 text-sm text-slate-600">
        <p>
          Already have access?{" "}
          <Link
            href={redirectTo === "/" ? "/login" : `/login?next=${encodeURIComponent(redirectTo)}`}
            className="font-bold text-orange-600 transition hover:text-orange-700"
          >
            Sign in instead
          </Link>
          .
        </p>
      </div>
    </AuthPageFrame>
  );
}
