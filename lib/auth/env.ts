const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);

export const AUTH_SESSION_COOKIE_NAME = "newsletter_session";
export const AUTH_SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

export function isRegistrationEnabled() {
  const value = readEnvValue(
    process.env.AUTH_REGISTRATION_ENABLED,
    process.env.NEXT_PUBLIC_AUTH_REGISTRATION_ENABLED
  );

  return value ? TRUE_VALUES.has(value.toLowerCase()) : false;
}

export function getRequiredAuthSessionSecret() {
  const value = getOptionalAuthSessionSecret();

  if (!value) {
    throw new Error(
      "Authentication is not configured. Set AUTH_SESSION_SECRET or SESSION_SECRET in .env.local."
    );
  }

  return value;
}

export function getOptionalAuthSessionSecret() {
  return readEnvValue(process.env.AUTH_SESSION_SECRET, process.env.SESSION_SECRET);
}

function readEnvValue(...values: Array<string | undefined>) {
  for (const value of values) {
    const normalized = value?.trim();

    if (normalized) {
      return normalized;
    }
  }

  return undefined;
}
