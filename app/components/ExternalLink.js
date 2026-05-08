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
      <svg
        className={s.icon}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 1.5H10.5V8.5M10.5 1.5L1.5 10.5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
