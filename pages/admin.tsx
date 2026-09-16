import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { upload } from "@vercel/blob/client";
import type { Post } from "../lib/posts";

type Stage = { name: string; state: "waiting" | "uploading" | "processing" | "done" | "error" };

/** Photos in flight at once. Higher stalls slow uplinks; lower is just slower. */
const CONCURRENCY = 3;

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  // Defaults to the month you upload in; change it only if the photos are older.
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 7));
  const [files, setFiles] = useState<File[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [busy, setBusy] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const loadPosts = useCallback(async () => {
    const res = await fetch("/api/admin/posts");
    if (res.ok) {
      const data = await res.json();
      setPosts(data.posts);
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) return setError((await res.json()).error || "Sign-in failed");
    setPassword("");
    loadPosts();
  }

  async function publish(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || files.length === 0) return;
    setBusy(true);
    setError("");
    setStages(files.map((f) => ({ name: f.name, state: "waiting" })));

    try {
      // Upload and convert a few at a time. Fully parallel would hammer a
      // phone's uplink and run several HEIC decodes at once; sequential was
      // needlessly slow for a six-photo post.
      const photos: any[] = new Array(files.length);

      const handleOne = async (i: number) => {
        const file = files[i];
        const mark = (state: Stage["state"]) =>
          setStages((s) => s.map((x, j) => (j === i ? { ...x, state } : x)));

        mark("uploading");
        const blob = await upload(`uploads/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/admin/blob-upload",
        });

        mark("processing");
        const res = await fetch("/api/admin/process", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: blob.url }),
        });
        if (!res.ok) {
          mark("error");
          throw new Error((await res.json()).error || `failed on ${file.name}`);
        }
        // Keep the slot so photos stay in the order they were picked.
        photos[i] = await res.json();
        mark("done");
      };

      let next = 0;
      const worker = async () => {
        while (next < files.length) await handleOne(next++);
      };
      await Promise.all(Array.from({ length: Math.min(CONCURRENCY, files.length) }, worker));

      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, date, photos }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "publish failed");

      setTitle("");
      setDate(new Date().toISOString().slice(0, 7));
      setFiles([]);
      setStages([]);
      await loadPosts();
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This removes it from the site.`)) return;
    await fetch(`/api/admin/posts?id=${id}`, { method: "DELETE" });
    loadPosts();
  }

  if (!authed) {
    return (
      <div className="wrap admin">
        <Head>
          <title>Admin</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="noindex" />
        </Head>
        <h1 className="admin-h1">Photos</h1>
        <form onSubmit={signIn} className="admin-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
          />
          <button type="submit">Sign in</button>
        </form>
        {error ? <p className="admin-error">{error}</p> : null}
      </div>
    );
  }

  return (
    <div className="wrap admin">
      <Head>
        <title>Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Head>

      <h1 className="admin-h1">New post</h1>
      <form onSubmit={publish} className="admin-form">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Madison, WI" />
        <input type="month" value={date} onChange={(e) => setDate(e.target.value)} />

        <label className="picker">
          {files.length ? `${files.length} photo${files.length > 1 ? "s" : ""} selected` : "Choose photos"}
          <input
            type="file"
            accept="image/*,.heic,.heif"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
          />
        </label>

        <button type="submit" disabled={busy || !title.trim() || files.length === 0}>
          {busy ? "Publishing…" : "Publish"}
        </button>
      </form>

      {stages.length > 0 ? (
        <ul className="stages">
          {stages.map((s) => (
            <li key={s.name}>
              <span>{s.name}</span>
              <span className="meta">{s.state}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {error ? <p className="admin-error">{error}</p> : null}

      <h2>Published</h2>
      {posts.length === 0 ? (
        <p className="blurb">Nothing yet.</p>
      ) : (
        <ul className="list">
          {posts.map((p) => (
            <li className="row" key={p.id}>
              <div className="row-head" style={{ cursor: "default" }}>
                <span className="name">
                  {p.title} <span className="meta">· {p.photos.length}</span>
                </span>
                <span className="year">{p.date}</span>
                <button type="button" className="del" onClick={() => remove(p.id, p.title)}>
                  delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
