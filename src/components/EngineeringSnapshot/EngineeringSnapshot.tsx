import { snapshot } from '../../data/story';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import styles from './EngineeringSnapshot.module.css';

export function EngineeringSnapshot() {
  const [lead, ...rest] = snapshot.paragraphs;
  return (
    <Section id="about" index="01" label="The engineer" title="More Than One Stack">
      <div className={styles.grid}>
        <Reveal className={styles.story}>
          <p className={styles.lead}>{lead}</p>
          {rest.map((p) => (
            <p key={p.slice(0, 24)} className={styles.body}>
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={120}>
          <dl className={styles.facts}>
            {snapshot.facts.map((f, i) => (
              <div key={f.label} className={styles.fact} data-tone={i < 2 ? 'amber' : 'cyan'}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
