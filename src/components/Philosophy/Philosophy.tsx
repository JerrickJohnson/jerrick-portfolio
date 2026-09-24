import { philosophy } from '../../data/story';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import styles from './Philosophy.module.css';

export function Philosophy() {
  return (
    <Section
      id="philosophy"
      index="07"
      label="How I think about software"
      title={
        <>
          Different Technologies. <span className={styles.accent}>Same Engineering Principles.</span>
        </>
      }
      intro={philosophy.statement}
    >
      <ol className={styles.list}>
        {philosophy.principles.map((p, i) => (
          <li key={p.title}>
            <Reveal delay={i * 60} className={styles.item}>
              <span className={styles.no}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.body}>{p.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
