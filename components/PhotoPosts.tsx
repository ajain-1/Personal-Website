import Image from "next/image";
import type { Post } from "../lib/posts";

function monthLabel(date: string) {
  if (!date) return "";
  return new Date(`${date.slice(0, 7)}-01T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** The post list itself. The lightbox lives with the parent page. */
export default function PhotoPosts({
  posts,
  onOpen,
}: {
  posts: Post[];
  onOpen: (photo: { src: string; caption: string }) => void;
}) {
  return (
    <>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <div className="post-head">
            <span className="post-title">{post.title}</span>
            {post.date ? <span className="year">{monthLabel(post.date)}</span> : null}
          </div>
          <div className="gallery">
            {post.photos.map((photo) => (
              <button
                key={photo.src}
                className="tile"
                onClick={() => onOpen({ src: photo.src, caption: photo.caption || post.title })}
                aria-label={photo.caption || `Photo from ${post.title}`}>
                <Image
                  src={photo.src}
                  alt={photo.caption || post.title}
                  fill
                  sizes="(max-width: 600px) 50vw, 240px"
                  style={{ objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
