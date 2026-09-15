import { put, list } from "@vercel/blob";

export type Photo = { src: string; caption?: string; width?: number; height?: number };
export type Post = { id: string; title: string; date: string; note: string; photos: Photo[] };

const INDEX = "posts/index.json";

/** The posts index, newest first. Empty when Blob isn't configured yet. */
export async function getPosts(): Promise<Post[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  try {
    const found = await list({ prefix: INDEX, limit: 1 });
    const blob = found.blobs.find((b) => b.pathname === INDEX);
    if (!blob) return [];
    // The Blob CDN will happily serve a stale index, which would make a
    // publish clobber or resurrect posts. Ask it to revalidate every time.
    const res = await fetch(`${blob.url}?t=${Date.now()}`, {
      cache: "no-store",
      headers: { "cache-control": "no-cache" },
    });
    if (!res.ok) return [];
    const posts: Post[] = await res.json();
    return posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  } catch (err) {
    console.error("[posts] read failed:", err);
    return [];
  }
}

export async function savePosts(posts: Post[]): Promise<void> {
  await put(INDEX, JSON.stringify(posts, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}
