import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import projects from "../components/projects.json";
import SiteHeader from "../components/SiteHeader";
import Lightbox, { type LightboxPhoto } from "../components/Lightbox";

const robots = projects.robots;

const Robots: NextPage = () => {
  const [lightbox, setLightbox] = useState<LightboxPhoto | null>(null);

  return (
    <div className="wrap">
      <Head>
        <title>Robots — Aryan Jain</title>
        <meta name="description" content="Competitive robots I designed, built, and programmed for VEX Robotics." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <SiteHeader />

      <section>
        <h2>Robots</h2>
        <p className="blurb">
          Some cool robots I've worked on over the years. These were as part of our high school VEX Robotics team. 
        </p>
        <div className="gallery">
          {robots.map(({ src, caption }) => (
            <button
              key={src}
              className="tile"
              onClick={() => setLightbox({ src, caption })}
              aria-label={caption || "View robot photo"}>
              <Image
                src={src}
                alt={caption}
                fill
                sizes="(max-width: 600px) 50vw, 240px"
                style={{ objectFit: "cover" }}
              />
            </button>
          ))}
        </div>
        <Link className="more" href="/">
          &larr; Back
        </Link>
      </section>

      <footer>San Francisco, CA</footer>

      <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
};

export default Robots;
