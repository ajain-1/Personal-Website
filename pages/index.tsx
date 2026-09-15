import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import projects from "../components/projects.json";
import introJson from "../components/intro.json";
import { getPosts, type Post } from "../lib/posts";

type Project = {
  name: string;
  year: string;
  url?: string;
  description: string[];
};

const sections: { title: string; items: Project[] }[] = [
  { title: "Machine Learning", items: projects.machineLearning },
  { title: "Systems", items: projects.systems },
];

const robots = projects.robots;
const intro = introJson.intro;

const Home: NextPage<{ posts: Post[] }> = ({ posts }) => {
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <div className="wrap">
      <Head>
        <title>Aryan Jain</title>
        <meta name="description" content="Aryan Jain — CS at Carnegie Mellon. Machine learning, software, robotics." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <header>
        <h1>Aryan Jain</h1>
        <div className="links">
          <a href="mailto:aryanj@andrew.cmu.edu">aryanj@andrew.cmu.edu</a>
          <span>/</span>
          <a href="https://www.linkedin.com/in/aryanjain1/">LinkedIn</a>
          <span>/</span>
          <a href="https://www.github.com/ajain-1">GitHub</a>
        </div>
      </header>

      <div className="intro">
        {intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <div className="columns">
      {sections.map(({ title, items }) => (
        <section key={title}>
          <h2>{title}</h2>
          <ul className="list">
            {items.map((p) => {
              const isOpen = open === p.name;
              return (
                <li key={p.name} className={isOpen ? "row open" : "row"}>
                  <button
                    className="row-head"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : p.name)}>
                    <span className="name">{p.name}</span>
                    <span className="year">{p.year}</span>
                  </button>
                  <div className="detail-wrap" aria-hidden={!isOpen}>
                    <div className="detail">
                      <ul>
                        {p.description.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                      {p.url ? (
                        <a
                          className="visit"
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          tabIndex={isOpen ? 0 : -1}>
                          View project &rarr;
                        </a>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      </div>

      <section>
        <h2>Robots</h2>
        <p className="blurb">
          Some of the cool robots I&apos;ve worked on over the years. These were as part of our high school VEX Robotics team.
        </p>
        <div className="gallery">
          {robots.map(({ src, caption }) => (
            <button
              key={src}
              className="tile"
              onClick={() => setLightbox({ src, caption })}
              aria-label="View robot photo">
              <Image src={src} alt={caption} fill sizes="(max-width: 600px) 50vw, 220px" style={{ objectFit: "cover" }} />
            </button>
          ))}
        </div>
      </section>

      {posts.length > 0 ? (
        <section>
          <h2>Photo Blog</h2>
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post-head">
                <span className="post-title">{post.title}</span>
                {post.date ? (
                  <span className="year">
                    {new Date(`${post.date.slice(0, 7)}-01T00:00:00Z`).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </span>
                ) : null}
              </div>
              <div className="gallery">
                {post.photos.map((photo) => (
                  <button
                    key={photo.src}
                    className="tile"
                    onClick={() => setLightbox({ src: photo.src, caption: photo.caption || post.title })}
                    aria-label={photo.caption || `Photo from ${post.title}`}>
                    <Image
                      src={photo.src}
                      alt={photo.caption || post.title}
                      fill
                      sizes="(max-width: 600px) 50vw, 240px"
                      style={{ objectFit: "cover" }}
                      unoptimized={false}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>
      ) : null}

      <footer>
        San Francisco, CA
      </footer>

      {lightbox ? (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <figure onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.src}
              alt={lightbox.caption}
              width={1000}
              height={750}
              style={{ width: "100%", height: "auto", maxHeight: "72vh", objectFit: "contain" }}
            />
            <figcaption>{lightbox.caption}</figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
};

export async function getStaticProps() {
  return { props: { posts: await getPosts() }, revalidate: 600 };
}

export default Home;
