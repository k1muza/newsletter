"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";
import type { AuthFormState } from "@/lib/auth/validation";

const INITIAL_STATE: AuthFormState = {};

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(loginAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <div>
        <label
          htmlFor="login-email"
          className="mb-2 block text-[11px] font-black uppercase tracking-[0.28em] text-slate-500"
        >
          Email
        </label>
        <input
          id="login-email"
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
          htmlFor="login-password"
          className="mb-2 block text-[11px] font-black uppercase tracking-[0.28em] text-slate-500"
        >
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
          placeholder="Enter your password"
          required
        />
        {state.fieldErrors?.password ? (
          <p className="mt-2 text-sm text-rose-600">{state.fieldErrors.password}</p>
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
        {pending ? "Signing In" : "Sign In"}
      </button>
    </form>
  );
}
