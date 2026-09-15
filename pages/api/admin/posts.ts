import type { NextApiRequest, NextApiResponse } from "next";
import { isAuthed } from "../../../lib/auth";
import { getPosts, deletePost } from "../../../lib/posts";

/** List posts for the admin page, or delete one. */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAuthed(req)) return res.status(401).json({ error: "not signed in" });

  if (req.method === "GET") return res.json({ posts: await getPosts() });

  if (req.method === "DELETE") {
    const id = String(req.query.id || "");
    if (!/^[a-z0-9]+$/i.test(id)) return res.status(400).json({ error: "bad id" });
    if (!(await deletePost(id))) return res.status(404).json({ error: "no such post" });
    return res.json({ ok: true });
  }

  return res.status(405).end();
}
