import { fullStack } from '../../data/story';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { TagList } from '../ui/Tag';
import styles from './FullStack.module.css';

export function FullStack() {
  return (
    <Section
      id="full-stack"
      tone="raised"
      index="04"
      label="Modern full-stack development"
      title="Expanding an enterprise foundation into the modern web stack."
    >
      <div className={styles.grid}>
        <Reveal className={styles.credential}>
          <p className={styles.school}>{fullStack.school}</p>
          <p className={styles.program}>{fullStack.program}</p>
          <div className={styles.body}>
            {fullStack.body.map((p, i) => (
              <p key={p} className={i === fullStack.body.length - 1 ? styles.emphasis : undefined}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <ul className={styles.groups}>
          {fullStack.groups.map((g, i) => (
            <li key={g.title}>
              <Reveal delay={i * 70} className={styles.group}>
                <h3 className={styles.groupTitle}>{g.title}</h3>
                <TagList items={g.items} tone="cyan" />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
