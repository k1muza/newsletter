import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_SESSION_COOKIE_NAME } from "./env";
import { createSessionToken, getSessionCookieOptions, verifySessionToken } from "./session";
import { buildLoginHref, sanitizeRedirectPath } from "./urls";
import { findAuthUserById, toPublicAuthUser } from "./users";

export const getCurrentUser = cache(async () => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(AUTH_SESSION_COOKIE_NAME)?.value;
  const payload = verifySessionToken(sessionToken);

  if (!payload) {
    return null;
  }

  const user = await findAuthUserById(payload.sub);

  if (!user) {
    return null;
  }

  return toPublicAuthUser(user);
});

export async function requireCurrentUser(redirectTo?: string) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(buildLoginHref(redirectTo));
  }

  return user;
}

export async function redirectIfAuthenticated() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }
}

export async function createUserSession(userId: string) {
  const cookieStore = await cookies();
  const options = getSessionCookieOptions();

  cookieStore.set({
    ...options,
    value: createSessionToken(userId),
  });
}

export async function clearUserSession() {
  const cookieStore = await cookies();
  const options = getSessionCookieOptions();

  cookieStore.set({
    ...options,
    maxAge: 0,
    value: "",
  });
}

export function getSafeRedirectTarget(value: string | null | undefined) {
  return sanitizeRedirectPath(value);
}
