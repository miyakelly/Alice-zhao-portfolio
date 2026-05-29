"use client";

import { ExternalLinkIcon } from "@radix-ui/react-icons";
import s from "./ExternalLink.module.css";

export default function ExternalLink({ href, children, className, hideIcon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${s.link}${className ? ` ${className}` : ""}`}
    >
      {children}
      {!hideIcon && <ExternalLinkIcon className={s.icon} />}
    </a>
  );
}
