import crypto from "crypto";
import type { NextApiRequest } from "next";

const COOKIE = "admin";

function secret() {
  return process.env.ADMIN_PASSWORD || "";
}

/** Opaque token tied to the current password, so changing it logs everyone out. */
export function makeToken(): string {
  const exp = Date.now() + 30 * 24 * 60 * 60 * 1000;
  const sig = crypto.createHmac("sha256", secret()).update(String(exp)).digest("hex");
  return `${exp}.${sig}`;
}

export function isValid(token?: string): boolean {
  if (!token || !secret()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const want = crypto.createHmac("sha256", secret()).update(exp).digest("hex");
  return sig.length === want.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(want));
}

export function isAuthed(req: NextApiRequest): boolean {
  return isValid(req.cookies[COOKIE]);
}

export function checkPassword(given: string): boolean {
  const want = secret();
  if (!want || given.length !== want.length) return false;
  return crypto.timingSafeEqual(Buffer.from(given), Buffer.from(want));
}

export const COOKIE_NAME = COOKIE;
