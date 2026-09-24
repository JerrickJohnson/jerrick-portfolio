import { site } from '../../data/site';
import { ArrowIcon, Button } from '../ui/Button';
import { ConvergenceVisual } from '../ConvergenceVisual/ConvergenceVisual';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.dot} aria-hidden="true" />
            <span>{site.title}</span>
          </p>

          <h1 id="hero-title" className={styles.title}>
            <span className={styles.name}>{site.name}</span>
            <span className={styles.headline}>
              From <span className={styles.amber}>enterprise systems</span> to{' '}
              <span className={styles.cyan}>modern applications</span>.
            </span>
          </h1>

          <p className={styles.summary}>{site.summary}</p>

          <ul className={styles.positioning} aria-label="Focus areas">
            {site.positioning.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <div className={styles.ctas}>
            <Button href="#projects">
              Explore My Work <ArrowIcon direction="down" />
            </Button>
            <Button href={site.resumeUrl} variant="ghost" external>
              View Resume <ArrowIcon direction="up-right" />
            </Button>
          </div>

          <div className={styles.social}>
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <span aria-hidden="true">/</span>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <ConvergenceVisual />
        </div>
      </div>
    </section>
  );
}
