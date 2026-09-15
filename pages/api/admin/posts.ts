import type { NextApiRequest, NextApiResponse } from "next";
import { isAuthed } from "../../../lib/auth";
import { getPosts, savePosts } from "../../../lib/posts";

/** List posts for the admin page, or delete one. */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAuthed(req)) return res.status(401).json({ error: "not signed in" });

  if (req.method === "GET") return res.json({ posts: await getPosts() });

  if (req.method === "DELETE") {
    const id = String(req.query.id || "");
    const posts = await getPosts();
    const next = posts.filter((p) => p.id !== id);
    if (next.length === posts.length) return res.status(404).json({ error: "no such post" });
    await savePosts(next);
    return res.json({ ok: true });
  }

  return res.status(405).end();
}
