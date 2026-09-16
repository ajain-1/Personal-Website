import Image from "next/image";
import { useEffect } from "react";

export type LightboxPhoto = { src: string; caption: string };

export default function Lightbox({ photo, onClose }: { photo: LightboxPhoto | null; onClose: () => void }) {
  useEffect(() => {
    if (!photo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [photo, onClose]);

  if (!photo) return null;

  return (
    <div className="lightbox" onClick={onClose}>
      <figure onClick={(e) => e.stopPropagation()}>
        <Image
          src={photo.src}
          alt={photo.caption}
          width={1000}
          height={750}
          style={{ width: "100%", height: "auto", maxHeight: "72vh", objectFit: "contain" }}
        />
        <figcaption>{photo.caption}</figcaption>
      </figure>
    </div>
  );
}
