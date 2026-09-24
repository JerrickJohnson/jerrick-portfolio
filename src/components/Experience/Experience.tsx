import { catHighlight, role, workGroups } from '../../data/experience';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { TagList } from '../ui/Tag';
import { DocumentPipeline } from '../DocumentPipeline/DocumentPipeline';
import styles from './Experience.module.css';

export function Experience() {
  return (
    <Section
      id="experience"
      tone="raised"
      index="02"
      label="Professional experience"
      title="Production software, real business rules."
      intro="The foundation of my engineering career: building and supporting enterprise insurance applications that the business runs on."
    >
      <Reveal>
        <article className={styles.role}>
          <div className={styles.roleHead}>
            <div>
              <h3 className={styles.roleTitle}>{role.title}</h3>
              <p className={styles.company}>{role.company}</p>
            </div>
            <p className={styles.dates}>
              <span className={styles.live} aria-hidden="true" />
              <span>{role.dates}</span>
            </p>
          </div>
          <p className={styles.roleSummary}>{role.summary}</p>
          <TagList items={role.platform} tone="amber" />
        </article>
      </Reveal>

      <ul className={styles.groups}>
        {workGroups.map((g, i) => (
          <li key={g.title}>
            <Reveal delay={i * 70} className={styles.group}>
              <span className={styles.groupIndex}>{String(i + 1).padStart(2, '0')}</span>
              <h4 className={styles.groupTitle}>{g.title}</h4>
              <ul className={styles.points}>
                {g.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal>
        <article className={styles.highlight}>
          <div>
            <p className={styles.highlightLabel}>{catHighlight.label}</p>
            <h3 className={styles.highlightTitle}>{catHighlight.title}</h3>
          </div>
          <div className={styles.highlightBody}>
            <p>{catHighlight.body}</p>
            <TagList items={catHighlight.tech} tone="amber" />
          </div>
        </article>
      </Reveal>

      <DocumentPipeline />
    </Section>
  );
}
