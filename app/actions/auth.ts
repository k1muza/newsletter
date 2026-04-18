"use server";

import { redirect } from "next/navigation";
import { isRegistrationEnabled } from "@/lib/auth/env";
import { verifyPassword } from "@/lib/auth/password";
import {
  clearUserSession,
  createUserSession,
  getSafeRedirectTarget,
} from "@/lib/auth/server";
import { createAuthUser, findAuthUserByEmail } from "@/lib/auth/users";
import {
  type AuthFormState,
  validateLoginForm,
  validateRegistrationForm,
} from "@/lib/auth/validation";

export async function loginAction(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = toString(formData.get("email"));
  const password = toString(formData.get("password"));
  const redirectTo = getSafeRedirectTarget(toString(formData.get("redirectTo")));
  const validationError = validateLoginForm(email, password);

  if (validationError) {
    return validationError;
  }

  try {
    const user = await findAuthUserByEmail(email);

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return {
        message: "Incorrect email or password.",
      };
    }

    await createUserSession(user.id);
  } catch (error) {
    return {
      message: getErrorMessage(error),
    };
  }

  redirect(redirectTo);
}

export async function registerAction(
  _: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  if (!isRegistrationEnabled()) {
    return {
      message: "Registration is currently disabled.",
    };
  }

  const name = toString(formData.get("name"));
  const email = toString(formData.get("email"));
  const password = toString(formData.get("password"));
  const confirmPassword = toString(formData.get("confirmPassword"));
  const redirectTo = getSafeRedirectTarget(toString(formData.get("redirectTo")));
  const validationError = validateRegistrationForm(name, email, password, confirmPassword);

  if (validationError) {
    return validationError;
  }

  try {
    const user = await createAuthUser({
      email,
      name,
      password,
    });

    await createUserSession(user.id);
  } catch (error) {
    return {
      message: getErrorMessage(error),
    };
  }

  redirect(redirectTo);
}

export async function logoutAction() {
  await clearUserSession();
  redirect("/login");
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}

function toString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value : "";
}
