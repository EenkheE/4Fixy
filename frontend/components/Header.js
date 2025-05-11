import Link from "next/link";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link href="/">InfraFix</Link>
      </h1>
      <nav>
        <Link href="/create" className={styles.navLink}>
          Report Issue
        </Link>
      </nav>
    </header>
  );
}
