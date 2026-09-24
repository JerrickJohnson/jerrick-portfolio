import { aiWorkflow } from '../../data/story';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import styles from './AIWorkflow.module.css';

export function AIWorkflow() {
  return (
    <Section id="workflow" tone="raised" index="08" label="AI-assisted development" title="Modern Development Workflow" intro={aiWorkflow.intro}>
      <ul className={styles.grid}>
        {aiWorkflow.uses.map((u, i) => (
          <li key={u.title}>
            <Reveal delay={(i % 3) * 60} className={styles.item}>
              <h3 className={styles.title}>{u.title}</h3>
              <p className={styles.body}>{u.body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
