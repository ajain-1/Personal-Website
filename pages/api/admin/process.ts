import type { NextApiRequest, NextApiResponse } from "next";
import { put, del } from "@vercel/blob";
import sharp from "sharp";
import convert from "heic-convert";
import { isAuthed } from "../../../lib/auth";

// One photo per request, so a slow HEIC decode can't blow the timeout.
export const config = { maxDuration: 60 };

/**
 * Normalises one uploaded photo: HEIC becomes JPEG (browsers other than
 * Safari can't render HEIC), and we record the dimensions for layout.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAuthed(req)) return res.status(401).json({ error: "not signed in" });
  if (req.method !== "POST") return res.status(405).end();

  const { url } = req.body || {};
  if (typeof url !== "string" || !url.startsWith("https://")) {
    return res.status(400).json({ error: "bad url" });
  }

  try {
    const upstream = await fetch(url);
    if (!upstream.ok) return res.status(502).json({ error: "could not read upload" });
    let buf = Buffer.from(await upstream.arrayBuffer());

    // Sniff the actual bytes: phones and apps mislabel extensions freely, and
    // we've seen a plain JPEG named .HEIC. ISO-BMFF puts "ftyp" at offset 4.
    const brand = buf.subarray(4, 12).toString("latin1");
    const isHeic = brand.startsWith("ftyp") && /heic|heix|hevc|heim|heis|hevm|hevs|mif1|msf1/.test(brand);
    let src = url;

    if (isHeic) {
      const decoded = Buffer.from(await convert({ buffer: buf as any, format: "JPEG", quality: 0.92 }));
      buf = await sharp(decoded).rotate().jpeg({ quality: 86 }).toBuffer();
      const name = url.split("/").pop()!.replace(/\.[a-z0-9]+$/i, "") + ".jpg";
      const saved = await put(`photos/${name}`, buf, {
        access: "public",
        contentType: "image/jpeg",
        addRandomSuffix: true,
      });
      src = saved.url;
      await del(url).catch(() => {});
    }

    const meta = await sharp(buf).metadata();
    return res.json({ src, width: meta.width || null, height: meta.height || null });
  } catch (err: any) {
    console.error("[process]", err);
    return res.status(500).json({ error: err?.message || "processing failed" });
  }
}
