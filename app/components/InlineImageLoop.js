"use client";

import { useState, useEffect } from "react";
import styles from "./InlineImageLoop.module.css";

export default function InlineImageLoop({ srcs }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % srcs.length);
    }, 300);
    return () => clearInterval(id);
  }, [srcs.length]);

  return (
    <span className={styles.wrap}>
      {srcs.map((src, i) => (
        <img
          key={i}
          src={src.trim()}
          alt=""
          className={`${styles.img}${i === index ? ` ${styles.active}` : ""}`}
        />
      ))}
    </span>
  );
}
