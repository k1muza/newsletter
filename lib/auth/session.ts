import { createHmac, timingSafeEqual } from "node:crypto";
import {
  AUTH_SESSION_COOKIE_NAME,
  AUTH_SESSION_DURATION_SECONDS,
  getOptionalAuthSessionSecret,
  getRequiredAuthSessionSecret,
} from "./env";

export interface AuthSessionTokenPayload {
  exp: number;
  sub: string;
}

export function createSessionToken(userId: string) {
  const expiresAt = Date.now() + AUTH_SESSION_DURATION_SECONDS * 1000;
  const payload = Buffer.from(
    JSON.stringify({
      exp: expiresAt,
      sub: userId,
    } satisfies AuthSessionTokenPayload)
  ).toString("base64url");
  const signature = signValue(payload, getRequiredAuthSessionSecret());

  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | null | undefined) {
  const secret = getOptionalAuthSessionSecret();

  if (!token || !secret) {
    return null;
  }

  const [encodedPayload, providedSignature] = token.split(".");

  if (!encodedPayload || !providedSignature) {
    return null;
  }

  const expectedSignature = signValue(encodedPayload, secret);

  if (!safeEqual(providedSignature, expectedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as Partial<AuthSessionTokenPayload>;

    if (typeof payload.sub !== "string" || typeof payload.exp !== "number") {
      return null;
    }

    if (payload.exp <= Date.now()) {
      return null;
    }

    return payload as AuthSessionTokenPayload;
  } catch {
    return null;
  }
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    maxAge: AUTH_SESSION_DURATION_SECONDS,
    name: AUTH_SESSION_COOKIE_NAME,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

export function getSessionTokenFromCookieHeader(cookieHeader: string | null | undefined) {
  if (!cookieHeader) {
    return null;
  }

  const segments = cookieHeader.split(";");

  for (const segment of segments) {
    const [rawName, ...rawValue] = segment.trim().split("=");

    if (rawName === AUTH_SESSION_COOKIE_NAME) {
      return rawValue.join("=") || null;
    }
  }

  return null;
}

function signValue(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}
