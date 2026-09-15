import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import projects from "../components/projects.json";

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

const Home: NextPage = () => {
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);

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
        <p>
          I study computer science at Carnegie Mellon. 
        </p>
      </div>

      <div className="columns">
      {sections.map(({ title, items }) => (
        <section key={title}>
          <h2>{title}</h2>
          {items.map((p) => (
            <article className="item" key={p.name}>
              <div className="item-head">
                <span className="name">
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noreferrer">
                      {p.name}
                    </a>
                  ) : (
                    p.name
                  )}
                </span>
                {p.year ? <span className="year">{p.year}</span> : null}
              </div>
              <ul>
                {p.description.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </article>
          ))}
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

export default Home;
