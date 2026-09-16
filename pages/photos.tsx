import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { getPosts, type Post } from "../lib/posts";
import SiteHeader from "../components/SiteHeader";
import PhotoPosts from "../components/PhotoPosts";
import Lightbox, { type LightboxPhoto } from "../components/Lightbox";

const Photos: NextPage<{ posts: Post[] }> = ({ posts }) => {
  const [lightbox, setLightbox] = useState<LightboxPhoto | null>(null);

  return (
    <div className="wrap">
      <Head>
        <title>Photos — Aryan Jain</title>
        <meta name="description" content="Photos from trips and scenic spots." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <SiteHeader />

      <section>
        <h2>Photo Blog</h2>
        {posts.length === 0 ? (
          <p className="blurb">Nothing here yet.</p>
        ) : (
          <PhotoPosts posts={posts} onOpen={setLightbox} />
        )}
        <Link className="more" href="/">
          &larr; Back
        </Link>
      </section>

      <footer>San Francisco, CA</footer>

      <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
};

export async function getStaticProps() {
  return { props: { posts: await getPosts() }, revalidate: 60 };
}

export default Photos;
