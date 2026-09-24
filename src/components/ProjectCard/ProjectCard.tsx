import type { Project } from '../../data/types';
import { ArrowIcon } from '../ui/Button';
import { TagList } from '../ui/Tag';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card} data-size={project.size}>
      <header className={styles.head}>
        <div>
          <h3 className={styles.name}>{project.name}</h3>
          <p className={styles.tagline}>{project.tagline}</p>
        </div>
        {project.team && <span className={styles.team}>{project.team}</span>}
      </header>

      <dl className={styles.facts}>
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

      <footer className={styles.links}>
        <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} source on GitHub`}>
          GitHub <ArrowIcon direction="up-right" />
        </a>
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
