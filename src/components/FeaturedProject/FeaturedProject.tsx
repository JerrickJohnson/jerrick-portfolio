import type { FeaturedProject as FeaturedProjectData } from '../../data/types';
import { ArrowIcon, Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { TagList } from '../ui/Tag';
import styles from './FeaturedProject.module.css';

export function FeaturedProject({ project }: { project: FeaturedProjectData }) {
  const [hero, ...thumbs] = project.screenshots;

  return (
    <article className={styles.card} aria-labelledby="featured-title">
      <Reveal className={styles.top}>
        <div className={styles.intro}>
          <div className={styles.badges}>
            <span className={styles.kicker}>Featured case study</span>
            {project.team && <span className={styles.team}>{project.team}</span>}
          </div>
          <h3 id="featured-title" className={styles.name}>
            {project.name}
          </h3>
          <p className={styles.tagline}>{project.tagline}</p>

          <div className={styles.block}>
            <h4 className={styles.h4}>What it is</h4>
            <p>{project.whatItIs}</p>
          </div>
          <div className={styles.block}>
            <h4 className={styles.h4}>The problem</h4>
            <p>{project.problem}</p>
          </div>
        </div>

        {hero && (
          <figure className={styles.shots}>
            <div className={styles.frame}>
              <div className={styles.chrome} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <img src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} loading="lazy" decoding="async" />
            </div>
            <figcaption className={styles.caption}>{hero.caption}</figcaption>
            <div className={styles.thumbs}>
              {thumbs.map((s) => (
                <figure key={s.src} className={styles.thumb}>
                  <img src={s.src} alt={s.alt} width={s.width} height={s.height} loading="lazy" decoding="async" />
                  <figcaption>{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          </figure>
        )}
      </Reveal>

      <div className={styles.details}>
        <Reveal className={styles.panel}>
          <h4 className={styles.h4}>Key features</h4>
          <ul className={styles.features}>
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80} className={`${styles.panel} ${styles.role}`}>
          <h4 className={styles.h4}>My role</h4>
          <ul className={styles.roleList}>
            {project.myRole.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={160} className={`${styles.panel} ${styles.arch}`}>
          <h4 className={styles.h4}>Architecture</h4>
          <ol className={styles.lanes} aria-label="Application architecture">
            {project.architecture.map((lane) => (
              <li key={lane.label} className={styles.lane} data-lane={lane.label.toLowerCase()}>
                <span className={styles.laneLabel}>{lane.label}</span>
                <ul>
                  {lane.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={80} className={`${styles.panel} ${styles.demonstrates}`}>
          <h4 className={styles.h4}>Demonstrates</h4>
          <ul className={styles.demoList}>
            {project.demonstrates.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <div className={styles.built}>
            <h4 className={styles.h4}>Built with</h4>
            <TagList items={project.builtWith} tone="cyan" />
          </div>
          <div className={styles.cta}>
            <Button href={project.repo} variant="ghost" external>
              View source on GitHub <ArrowIcon direction="up-right" />
            </Button>
            <p className={styles.note}>The hosted demo has been retired; source and screenshots are on GitHub.</p>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
