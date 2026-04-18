import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_SESSION_COOKIE_NAME } from "@/lib/auth/env";
import { verifySessionToken } from "@/lib/auth/session";
import { buildLoginHref, isAuthPagePath, isProtectedApiPath } from "@/lib/auth/urls";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const sessionToken = request.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value;
  const session = verifySessionToken(sessionToken);

  if (session) {
    if (isAuthPagePath(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  if (isProtectedApiPath(pathname)) {
    return NextResponse.json(
      {
        error: "Authentication required.",
      },
      { status: 401 }
    );
  }

  if (!isAuthPagePath(pathname)) {
    return NextResponse.redirect(new URL(buildLoginHref(`${pathname}${search}`), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
