import { featured, projects } from '../../data/projects';
import { FeaturedProject } from '../FeaturedProject/FeaturedProject';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import styles from './Projects.module.css';

export function Projects() {
  const main = projects.filter((p) => p.size !== 'compact');
  const additional = projects.filter((p) => p.size === 'compact');

  return (
    <Section
      id="projects"
      index="05"
      label="Selected work"
      title="Selected Work"
      intro="A selection of modern applications built while expanding my full-stack development experience."
    >
      <FeaturedProject project={featured} />

      <div className={styles.grid}>
        {main.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 90} className={styles[p.size]}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>

      <div className={styles.additional}>
        <h3 className={styles.additionalTitle}>Additional work</h3>
        <div className={styles.compactGrid}>
          {additional.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
