import { put, list, del } from "@vercel/blob";

export type Photo = { src: string; caption?: string; width?: number; height?: number };
export type Post = { id: string; title: string; date: string; photos: Photo[] };

const PREFIX = "posts/items/";

/**
 * Each post is its own blob rather than entries in one index file.
 * A shared index means read-modify-write, and because the Blob CDN can
 * serve a stale copy, two publishes close together would lose one of them.
 * Per-post blobs are written once and never mutated, so there's no race.
 */
export async function getPosts(): Promise<Post[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  try {
    const { blobs } = await list({ prefix: PREFIX, limit: 1000 });
    const posts = await Promise.all(
      blobs.map(async (b) => {
        try {
          const res = await fetch(b.url, { cache: "no-store" });
          return res.ok ? ((await res.json()) as Post) : null;
        } catch {
          return null;
        }
      })
    );
    return posts
      .filter((p): p is Post => !!p && Array.isArray(p.photos))
      .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  } catch (err) {
    console.error("[posts] read failed:", err);
    return [];
  }
}

export async function savePost(post: Post): Promise<void> {
  await put(`${PREFIX}${post.id}.json`, JSON.stringify(post, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

export async function deletePost(id: string): Promise<boolean> {
  const { blobs } = await list({ prefix: `${PREFIX}${id}.json`, limit: 1 });
  const blob = blobs.find((b) => b.pathname === `${PREFIX}${id}.json`);
  if (!blob) return false;
  await del(blob.url);
  return true;
}
