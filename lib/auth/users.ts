import "server-only";

import { createHash } from "node:crypto";
import {
  ensureSupabaseNewsletterDataBucket,
  getSupabaseAdminClient,
  getSupabaseNewsletterDataBucket,
  isSupabaseObjectNotFoundError,
} from "@/lib/supabase/server";
import { hashPassword } from "./password";
import { normalizeEmail } from "./validation";

const AUTH_USERS_PATH = "auth/users.json";

interface AuthUsersFile {
  updatedAt: string | null;
  users: StoredAuthUser[];
}

export interface StoredAuthUser {
  createdAt: string;
  email: string;
  id: string;
  name: string;
  passwordHash: string;
}

export interface PublicAuthUser {
  createdAt: string;
  email: string;
  id: string;
  name: string;
}

export async function createAuthUser({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) {
  const usersFile = await readUsersFile();
  const normalizedEmail = normalizeEmail(email);

  if (usersFile.users.some((user) => user.email === normalizedEmail)) {
    throw new Error("An account with that email already exists.");
  }

  const user: StoredAuthUser = {
    createdAt: new Date().toISOString(),
    email: normalizedEmail,
    id: createUserId(normalizedEmail),
    name: name.trim(),
    passwordHash: await hashPassword(password),
  };

  await writeUsersFile([...usersFile.users, user]);

  return user;
}

export async function findAuthUserByEmail(email: string) {
  const normalizedEmail = normalizeEmail(email);
  const usersFile = await readUsersFile();

  return usersFile.users.find((user) => user.email === normalizedEmail) ?? null;
}

export async function findAuthUserById(userId: string) {
  const usersFile = await readUsersFile();

  return usersFile.users.find((user) => user.id === userId) ?? null;
}

export function toPublicAuthUser(user: StoredAuthUser): PublicAuthUser {
  return {
    createdAt: user.createdAt,
    email: user.email,
    id: user.id,
    name: user.name,
  };
}

async function readUsersFile(): Promise<AuthUsersFile> {
  const supabase = getSupabaseAdminClient();
  const bucketName = getSupabaseNewsletterDataBucket();

  await ensureSupabaseNewsletterDataBucket();

  const { data, error } = await supabase.storage.from(bucketName).download(AUTH_USERS_PATH);

  if (error) {
    if (isSupabaseObjectNotFoundError(error)) {
      return {
        updatedAt: null,
        users: [],
      };
    }

    throw error;
  }

  const payload = (await data.text()).trim();

  if (!payload) {
    return {
      updatedAt: null,
      users: [],
    };
  }

  try {
    const parsed = JSON.parse(payload) as Partial<AuthUsersFile>;

    return {
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : null,
      users: Array.isArray(parsed.users) ? parsed.users.filter(isStoredAuthUser) : [],
    };
  } catch {
    throw new Error("Authentication user store is not valid JSON.");
  }
}

async function writeUsersFile(users: StoredAuthUser[]) {
  const supabase = getSupabaseAdminClient();
  const bucketName = getSupabaseNewsletterDataBucket();
  const payload: AuthUsersFile = {
    updatedAt: new Date().toISOString(),
    users,
  };

  await ensureSupabaseNewsletterDataBucket();

  const { error } = await supabase.storage.from(bucketName).upload(
    AUTH_USERS_PATH,
    JSON.stringify(payload),
    {
      cacheControl: "0",
      contentType: "application/json",
      upsert: true,
    }
  );

  if (error) {
    throw error;
  }
}

function createUserId(email: string) {
  return createHash("sha256")
    .update(`${email}:${crypto.randomUUID()}`)
    .digest("hex")
    .slice(0, 24);
}

function isStoredAuthUser(value: unknown): value is StoredAuthUser {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<StoredAuthUser>;

  return (
    typeof candidate.createdAt === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.passwordHash === "string"
  );
}
