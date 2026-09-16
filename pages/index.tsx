import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import projects from "../components/projects.json";
import introJson from "../components/intro.json";
import experienceJson from "../components/experience.json";
import { getPosts, type Post } from "../lib/posts";
import SiteHeader from "../components/SiteHeader";
import PhotoPosts from "../components/PhotoPosts";
import Lightbox, { type LightboxPhoto } from "../components/Lightbox";

const HOME_POSTS = 2;

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
const experience = experienceJson.experience;

/** Renders [text](href) links inside an otherwise plain intro paragraph. */
function withLinks(text: string) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((chunk, i) => {
    const m = chunk.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return chunk;
    return (
      <a key={i} href={m[2]}>
        {m[1]}
      </a>
    );
  });
}

const Home: NextPage<{ posts: Post[] }> = ({ posts }) => {
  const [lightbox, setLightbox] = useState<LightboxPhoto | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="wrap">
      <Head>
        <title>Aryan Jain</title>
        <meta name="description" content="Aryan Jain — CS at Carnegie Mellon. Machine learning, software, robotics." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <SiteHeader />

      <div className="intro">
        {intro.map((p) => (
          <p key={p}>{withLinks(p)}</p>
        ))}
      </div>

      {/* Experience section — hidden for now; data still lives in experience.json
      <section>
        <h2>Experience</h2>
        <ul className="list">
          {experience.map((job) => (
            <li className="row" key={`${job.place}-${job.when}`}>
              <div className="row-head static">
                <span className="name">
                  {job.place}
                  <span className="role">{job.title}</span>
                </span>
                <span className="year">{job.when}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
      */}

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

      {/* Robots section — hidden for now; data still lives in projects.json
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
      */}

      {posts.length > 0 ? (
        <section id="photos">
          <h2>Photo Blog</h2>
          <PhotoPosts posts={posts.slice(0, HOME_POSTS)} onOpen={setLightbox} />
          {posts.length > HOME_POSTS ? (
            <Link className="more" href="/photos">
              See all {posts.length} posts &rarr;
            </Link>
          ) : null}
        </section>
      ) : null}

      <footer>
        San Francisco, CA
      </footer>

      <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
};

export async function getStaticProps() {
  return { props: { posts: await getPosts() }, revalidate: 60 };
}

export default Home;
