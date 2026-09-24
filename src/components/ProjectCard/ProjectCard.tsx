import type { Project } from '../../data/types';
import { ArrowIcon } from '../ui/Button';
import { TagList } from '../ui/Tag';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project, headingLevel = 3 }: { project: Project; headingLevel?: 3 | 4 }) {
  const shot = project.screenshot;
  const Title = `h${headingLevel}` as const;

  return (
    <article id={project.slug} className={styles.card} data-size={project.size}>
      <header className={styles.head}>
        <div>
          <Title className={styles.name}>{project.name}</Title>
          <p className={styles.tagline}>{project.tagline}</p>
        </div>
        <div className={styles.badges}>
          {project.aiAssisted && <span className={styles.ai}>Built with AI · Claude</span>}
          {project.team && <span className={styles.team}>{project.team}</span>}
        </div>
      </header>

      <div className={styles.body}>
        <dl className={styles.facts}>
          {project.origin && (
            <div className={styles.origin}>
              <dt>Why I built it</dt>
              <dd>{project.origin}</dd>
            </div>
          )}
          <div className={styles.what}>
            <dt>What it is</dt>
            <dd>{project.whatItIs}</dd>
          </div>
          <div className={styles.built}>
            <dt>Built with</dt>
            <dd>
              <TagList items={project.builtWith} />
            </dd>
          </div>
          <div className={styles.demo}>
            <dt>Demonstrates</dt>
            <dd>
              <ul className={styles.demoList}>
                {project.demonstrates.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        {(shot || project.howBuilt) && (
          <div className={styles.aside}>
            {shot && (
              <figure className={styles.shot}>
                <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} loading="lazy" decoding="async" />
                <figcaption>{shot.caption}</figcaption>
              </figure>
            )}
            {project.howBuilt && (
              <section className={styles.howBuilt} aria-labelledby={`${project.slug}-how`}>
                <h4 id={`${project.slug}-how`}>How I built it with AI</h4>
                <ul>
                  {project.howBuilt.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>

      <footer className={styles.links}>
        <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} source on GitHub`}>
          GitHub <ArrowIcon direction="up-right" />
        </a>
        {project.download && (
          <a
            href={project.download.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download ${project.name} for Windows`}
            className={styles.live}
          >
            {project.download.label} <ArrowIcon direction="down" />
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Live demo of ${project.name}`}
            className={styles.live}
          >
            Live demo <ArrowIcon direction="up-right" />
          </a>
        )}
      </footer>
    </article>
  );
}
