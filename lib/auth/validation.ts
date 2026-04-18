export interface AuthFormState {
  fieldErrors?: Partial<Record<"confirmPassword" | "email" | "name" | "password", string>>;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function validateLoginForm(email: string, password: string): AuthFormState | null {
  const fieldErrors: AuthFormState["fieldErrors"] = {};

  if (!EMAIL_PATTERN.test(normalizeEmail(email))) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (password.trim().length < 8) {
    fieldErrors.password = "Password must be at least 8 characters.";
  }

  return hasFieldErrors(fieldErrors) ? { fieldErrors } : null;
}

export function validateRegistrationForm(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): AuthFormState | null {
  const fieldErrors: AuthFormState["fieldErrors"] = {};

  if (name.trim().length < 2) {
    fieldErrors.name = "Name must be at least 2 characters.";
  }

  if (!EMAIL_PATTERN.test(normalizeEmail(email))) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (password.trim().length < 8) {
    fieldErrors.password = "Password must be at least 8 characters.";
  }

  if (password !== confirmPassword) {
    fieldErrors.confirmPassword = "Passwords do not match.";
  }

  return hasFieldErrors(fieldErrors) ? { fieldErrors } : null;
}

function hasFieldErrors(fieldErrors: AuthFormState["fieldErrors"]) {
  return Boolean(fieldErrors && Object.values(fieldErrors).some(Boolean));
}
