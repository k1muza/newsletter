export function sanitizeRedirectPath(value: string | null | undefined) {
  if (!value) {
    return "/";
  }

  const normalized = value.trim();

  if (!normalized.startsWith("/") || normalized.startsWith("//")) {
    return "/";
  }

  return normalized;
}

export function buildLoginHref(redirectTo: string | null | undefined) {
  const safeRedirect = sanitizeRedirectPath(redirectTo);

  return safeRedirect === "/"
    ? "/login"
    : `/login?next=${encodeURIComponent(safeRedirect)}`;
}

export function isAuthPagePath(pathname: string) {
  return pathname === "/login" || pathname === "/register";
}

export function isProtectedApiPath(pathname: string) {
  return pathname.startsWith("/api/") && !pathname.startsWith("/api/auth/");
}
