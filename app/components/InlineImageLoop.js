import styles from "./InlineImageLoop.module.css";

export default function InlineImageLoop({ srcs }) {
  return (
    <span className={styles.wrap} style={{ "--img-count": srcs.length }}>
      {srcs.map((src, i) => (
        <img
          key={i}
          src={src.trim()}
          alt=""
          className={styles.img}
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </span>
  );
}
