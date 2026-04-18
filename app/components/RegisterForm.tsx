"use client";

import { useActionState } from "react";
import { registerAction } from "@/app/actions/auth";
import type { AuthFormState } from "@/lib/auth/validation";

const INITIAL_STATE: AuthFormState = {};

export function RegisterForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(registerAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <div>
        <label
          htmlFor="register-name"
          className="mb-2 block text-[11px] font-black uppercase tracking-[0.28em] text-slate-500"
        >
          Name
        </label>
        <input
          id="register-name"
          name="name"
          type="text"
          autoComplete="name"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
          placeholder="Your full name"
          required
        />
        {state.fieldErrors?.name ? (
          <p className="mt-2 text-sm text-rose-600">{state.fieldErrors.name}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="register-email"
          className="mb-2 block text-[11px] font-black uppercase tracking-[0.28em] text-slate-500"
        >
          Email
        </label>
        <input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
          placeholder="name@example.com"
          required
        />
        {state.fieldErrors?.email ? (
          <p className="mt-2 text-sm text-rose-600">{state.fieldErrors.email}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="register-password"
          className="mb-2 block text-[11px] font-black uppercase tracking-[0.28em] text-slate-500"
        >
          Password
        </label>
        <input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
          placeholder="At least 8 characters"
          required
        />
        {state.fieldErrors?.password ? (
          <p className="mt-2 text-sm text-rose-600">{state.fieldErrors.password}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="register-confirm-password"
          className="mb-2 block text-[11px] font-black uppercase tracking-[0.28em] text-slate-500"
        >
          Confirm Password
        </label>
        <input
          id="register-confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
          placeholder="Repeat your password"
          required
        />
        {state.fieldErrors?.confirmPassword ? (
          <p className="mt-2 text-sm text-rose-600">{state.fieldErrors.confirmPassword}</p>
        ) : null}
      </div>

      {state.message ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className={`w-full rounded-full px-5 py-3 text-sm font-black uppercase tracking-[0.24em] text-white transition ${
          pending ? "bg-slate-400" : "bg-slate-950 hover:bg-orange-500"
        }`}
      >
        {pending ? "Creating Account" : "Create Account"}
      </button>
    </form>
  );
}
