import { aiWorkflow } from '../../data/story';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { TagList } from '../ui/Tag';
import styles from './AIWorkflow.module.css';

export function AIWorkflow() {
  return (
    <Section id="workflow" tone="raised" index="08" label="Modern development workflow" title="Building with AI" intro={aiWorkflow.intro}>
      <ol className={styles.steps} aria-label="How I build with AI">
        {aiWorkflow.steps.map((s, i) => (
          <li key={s.title}>
            <Reveal delay={i * 60} className={styles.step}>
              <span className={styles.no}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>

      <p className={styles.examplesLabel}>In practice</p>
      <div className={styles.examples}>
        {aiWorkflow.examples.map((ex, i) => (
          <Reveal key={ex.title} delay={i * 90} className={styles.example}>
            <p className={styles.kind}>{ex.kind}</p>
            <h3 className={styles.exampleTitle}>{ex.title}</h3>
            <p className={styles.body}>{ex.body}</p>
            {ex.href &&
              (ex.href.startsWith('http') ? (
                <a href={ex.href} className={styles.exampleLink} target="_blank" rel="noopener noreferrer">
                  {ex.linkLabel} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <a href={ex.href} className={styles.exampleLink}>
                  {ex.linkLabel} <span aria-hidden="true">↑</span>
                </a>
              ))}
          </Reveal>
        ))}
      </div>

      <div className={styles.also}>
        <span className={styles.alsoLabel}>I also use AI for</span>
        <TagList items={aiWorkflow.alsoFor} />
      </div>
    </Section>
  );
}
