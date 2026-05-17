"use client";

import s from "./ExternalLink.module.css";

export default function ExternalLink({ href, children, className }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${s.link}${className ? ` ${className}` : ""}`}
    >
      {children}
    </a>
  );
}
