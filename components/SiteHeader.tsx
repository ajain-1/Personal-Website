import Link from "next/link";

/** Name and contact links, shared by every page. */
export default function SiteHeader() {
  return (
    <header>
      <h1>Aryan Jain</h1>
      <div className="links">
        <a href="mailto:aryanj@andrew.cmu.edu">aryanj@andrew.cmu.edu</a>
        <span>/</span>
        <a href="https://www.linkedin.com/in/aryanjain1/">LinkedIn</a>
        <span>/</span>
        <a href="https://www.github.com/ajain-1">GitHub</a>
        <span>/</span>
        <Link href="/photos">Photo Blog</Link>
      </div>
    </header>
  );
}
