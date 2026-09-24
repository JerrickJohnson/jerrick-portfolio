import { site } from '../../data/site';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>
          © {new Date().getFullYear()} {site.name} · {site.title}
        </p>
        <nav aria-label="Footer" className={styles.links}>
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
          <a href="#home">Back to top ↑</a>
        </nav>
      </div>
    </footer>
  );
}
