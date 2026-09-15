import type { NextApiRequest, NextApiResponse } from "next";
import { isAuthed } from "../../../lib/auth";
import { getPosts, savePosts, type Post } from "../../../lib/posts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAuthed(req)) return res.status(401).json({ error: "not signed in" });
  if (req.method !== "POST") return res.status(405).end();

  const { title, date, photos } = req.body || {};
  if (typeof title !== "string" || !title.trim()) return res.status(400).json({ error: "title required" });
  if (!Array.isArray(photos) || photos.length === 0) return res.status(400).json({ error: "no photos" });
  // A photo that failed processing has no usable src; refuse rather than
  // writing a broken entry into the index.
  const bad = photos.findIndex((p: any) => typeof p?.src !== "string" || !/^https?:\/\//.test(p.src));
  if (bad !== -1) return res.status(400).json({ error: `photo ${bad + 1} has no valid image url` });

  try {
    const post: Post = {
      id: `${Date.now().toString(36)}`,
      title: title.trim(),
      date: typeof date === "string" && date ? date : new Date().toISOString().slice(0, 10),
      photos: photos.map((p: any) => ({
        src: String(p.src),
        caption: typeof p.caption === "string" ? p.caption : "",
        width: p.width || undefined,
        height: p.height || undefined,
      })),
    };

    const posts = await getPosts();
    await savePosts([post, ...posts]);
    return res.json({ ok: true, post });
  } catch (err: any) {
    console.error("[publish]", err);
    return res.status(500).json({ error: err?.message || "publish failed" });
  }
}
