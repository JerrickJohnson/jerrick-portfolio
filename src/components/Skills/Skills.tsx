import { skillGroups } from '../../data/skills';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { TagList } from '../ui/Tag';
import styles from './Skills.module.css';

export function Skills() {
  return (
    <Section
      id="skills"
      tone="raised"
      index="06"
      label="Engineering skills"
      title="Organized by the work, not by the logo."
      intro="Skills grouped by the kind of engineering they support, from enterprise systems to the modern web."
    >
      <ul className={styles.grid}>
        {skillGroups.map((g, i) => (
          <li key={g.title}>
            <Reveal delay={(i % 3) * 70} className={styles.group}>
              <div className={styles.bar} data-tone={g.tone} aria-hidden="true" />
              <h3 className={styles.title}>{g.title}</h3>
              <TagList items={g.items} tone={g.tone} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
