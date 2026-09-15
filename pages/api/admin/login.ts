import type { NextApiRequest, NextApiResponse } from "next";
import { checkPassword, makeToken, COOKIE_NAME } from "../../../lib/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  if (!process.env.ADMIN_PASSWORD) return res.status(503).json({ error: "ADMIN_PASSWORD not set" });

  const { password } = req.body || {};
  if (typeof password !== "string" || !checkPassword(password)) {
    return res.status(401).json({ error: "Wrong password" });
  }

  const secure = process.env.NODE_ENV === "production" ? " Secure;" : "";
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${makeToken()}; Path=/; HttpOnly; SameSite=Lax;${secure} Max-Age=${30 * 24 * 60 * 60}`
  );
  return res.json({ ok: true });
}
