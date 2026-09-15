import type { NextApiRequest, NextApiResponse } from "next";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAuthed } from "../../../lib/auth";

/**
 * Issues client-upload tokens. Photos go browser -> Blob directly, which
 * avoids the 4.5MB limit on a serverless request body.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAuthed(req)) return res.status(401).json({ error: "not signed in" });

  try {
    const result = await handleUpload({
      request: req,
      body: req.body as HandleUploadBody,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/*", "application/octet-stream"],
        maximumSizeInBytes: 50 * 1024 * 1024,
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {},
    });
    return res.json(result);
  } catch (err: any) {
    console.error("[blob-upload]", err);
    return res.status(400).json({ error: err?.message || "upload failed" });
  }
}
