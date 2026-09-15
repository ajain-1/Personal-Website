import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import projects from "../components/projects.json";

type Project = {
  name: string;
  year: string;
  description: string[];
  images: string[];
  imageDescriptions: string[];
  links?: string[];
};

const sections: { title: string; items: Project[] }[] = [
  { title: "Machine Learning", items: projects.ai as Project[] },
  { title: "Software", items: projects.cloud as Project[] },
  { title: "Robotics", items: projects.robotics as Project[] },
];

const honors = [
  { title: "Lockheed Martin Scholar", meta: "Lockheed Martin · 2023" },
  { title: "Southern California Edison Scholar", meta: "Edison International · 2023" },
  { title: "VEX World Championship, Science Division (2×)", meta: "VEX Robotics · 2022, 2023" },
  { title: "VEX State Championship (3×)", meta: "VEX Robotics · 2019, 2022, 2023" },
  { title: "AWS Certified Solutions Architect", meta: "Amazon Web Services · 2022" },
  { title: "STEAM Award", meta: "Calabasas High School · 2020" },
];

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
          I study computer science at Carnegie Mellon. I care most about machine learning and robotics,
          and I spend most of my time building software.
        </p>
        <p>A few things I&apos;ve made, most recent first.</p>
      </div>

      {sections.map(({ title, items }) => (
        <section key={title}>
          <h2>{title}</h2>
          {items.map((p) => (
            <article className="item" key={p.name}>
              <div className="item-head">
                <span className="name">{p.name}</span>
                {p.year ? <span className="year">{p.year}</span> : null}
              </div>
              <ul>
                {p.description.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              {p.images.length > 0 ? (
                <div className="thumbs">
                  {p.images.map((src, i) => {
                    const link = p.links?.[i];
                    return (
                      <button
                        key={src}
                        onClick={() => {
                          if (link) window.open(link, "_blank");
                          else setLightbox({ src, caption: p.imageDescriptions[i] || p.name });
                        }}
                        aria-label={link ? `Open link for ${p.name}` : `View image from ${p.name}`}>
                        <Image src={src} alt={p.name} width={86} height={66} style={{ objectFit: "cover" }} />
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </article>
          ))}
        </section>
      ))}

      <section>
        <h2>Honors</h2>
        {honors.map((h) => (
          <div className="honor" key={h.title}>
            <span>{h.title}</span>
            <span className="meta">{h.meta}</span>
          </div>
        ))}
      </section>

      <footer>
        <a href="/resume.pdf">Résumé</a> · Los Angeles, CA
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
