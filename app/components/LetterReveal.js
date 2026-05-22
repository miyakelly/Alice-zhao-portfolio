"use client";

import styles from "./LetterReveal.module.css";

export default function LetterReveal({ text, delayOffset = 0 }) {
  const words = text.split(" ");
  let charIndex = delayOffset;

  return words.map((word, wi) => {
    const letters = [...word].map((char, ci) => {
      const idx = charIndex++;
      return (
        <span key={ci} className={styles.clip}>
          <span
            className={styles.inner}
            style={{ transitionDelay: `${idx * 5}ms` }}
          >
            {char}
          </span>
        </span>
      );
    });
    charIndex++;
    return (
      <span key={wi}>
        <span className={styles.word}>{letters}</span>
        {wi < words.length - 1 ? " " : null}
      </span>
    );
  });
}
