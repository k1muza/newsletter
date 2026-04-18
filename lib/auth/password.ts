import "server-only";

import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scrypt(password, salt, 64)) as Buffer;

  return `${salt}:${hash.toString("hex")}`;
}

export async function verifyPassword(password: string, passwordHash: string) {
  const [salt, storedHash] = passwordHash.split(":");

  if (!salt || !storedHash) {
    return false;
  }

  const candidate = (await scrypt(password, salt, 64)) as Buffer;
  const stored = Buffer.from(storedHash, "hex");

  if (candidate.length !== stored.length) {
    return false;
  }

  return timingSafeEqual(candidate, stored);
}
