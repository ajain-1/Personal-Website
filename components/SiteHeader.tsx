import Link from "next/link";

/** Name, contact links, and page links, shared by every page. */
export default function SiteHeader() {
  return (
    <header>
      <h1>
        <Link href="/">Aryan Jain</Link>
      </h1>
      <div className="links">
        <div className="links-contact">
          <a href="mailto:aryanj@andrew.cmu.edu">aryanj@andrew.cmu.edu</a>
          <span>/</span>
          <a href="https://www.linkedin.com/in/aryanjain1/">LinkedIn</a>
          <span>/</span>
          <a href="https://www.github.com/ajain-1">GitHub</a>
        </div>
        <nav className="links-pages">
          <Link href="/photos">Photo Blog</Link>
          <span>/</span>
          <Link href="/robots">Robots</Link>
        </nav>
      </div>
    </header>
  );
}
