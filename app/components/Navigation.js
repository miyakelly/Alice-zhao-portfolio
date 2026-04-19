"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const router = useRouter();

  const handleContactClick = (e) => {
    e.preventDefault();
    router.push("/");
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link href="/" className="nav-logo">Portfolio</Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link href="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link href="/#work" className="nav-link">Work</Link>
          </li>
          <li className="nav-item">
            <Link href="/about" className="nav-link">About</Link>
          </li>
          <li className="nav-item">
            <a href="#contact" onClick={handleContactClick} className="nav-link">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
