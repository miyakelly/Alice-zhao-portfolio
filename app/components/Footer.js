import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>Alice [Liang] Zhao © {new Date().getFullYear()}</span>
      <span>Senior UX Designer + Builder</span>
    </footer>
  );
}
