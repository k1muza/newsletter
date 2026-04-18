import Link from "next/link";
import { AuthPageFrame } from "@/app/components/AuthPageFrame";
import { LoginForm } from "@/app/components/LoginForm";
import { isRegistrationEnabled } from "@/lib/auth/env";
import { getSafeRedirectTarget, redirectIfAuthenticated } from "@/lib/auth/server";

interface LoginPageProps {
  searchParams: Promise<{ next?: string | string[] }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  await redirectIfAuthenticated();

  const { next } = await searchParams;
  const redirectTo = getSafeRedirectTarget(Array.isArray(next) ? next[0] : next);
  const registrationEnabled = isRegistrationEnabled();

  return (
    <AuthPageFrame
      eyebrow="Login"
      title="Sign in"
      subtitle="Use your account to access the newsletter studio and private editor APIs."
    >
      <LoginForm redirectTo={redirectTo} />

      <div className="mt-6 border-t border-slate-100 pt-5 text-sm text-slate-600">
        {registrationEnabled ? (
          <p>
            Need an account?{" "}
            <Link
              href={redirectTo === "/" ? "/register" : `/register?next=${encodeURIComponent(redirectTo)}`}
              className="font-bold text-orange-600 transition hover:text-orange-700"
            >
              Create one here
            </Link>
            .
          </p>
        ) : (
          <p>Registration is currently disabled by environment configuration.</p>
        )}
      </div>
    </AuthPageFrame>
  );
}
