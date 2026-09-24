import { docPathSteps, documentIntro, documentNotes, printPipeline } from '../../data/experience';
import { Reveal } from '../ui/Reveal';
import styles from './DocumentPipeline.module.css';

export function DocumentPipeline() {
  return (
    <div className={styles.wrap}>
      <Reveal className={styles.head}>
        <p className={styles.kicker}>Beyond application code</p>
        <h3 className={styles.title}>Enterprise Document Processing</h3>
        <p className={styles.intro}>{documentIntro}</p>
      </Reveal>

      <Reveal>
        <ol className={styles.pipeline} aria-label="Print pipeline">
          {printPipeline.map((step, i) => (
            <li key={step.label} className={styles.step} data-last={i === printPipeline.length - 1}>
              <span className={styles.stepNo}>{String(i + 1).padStart(2, '0')}</span>
              <h4 className={styles.stepLabel}>{step.label}</h4>
              <p className={styles.stepDetail}>{step.detail}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      <div className={styles.lower}>
        <Reveal className={styles.docpath}>
          <h4 className={styles.laneTitle}>
            DocPath Designer
            <span className={styles.laneHint}>forms & integration</span>
          </h4>
          <ol className={styles.lane} aria-label="DocPath workflow">
            {docPathSteps.map((s) => (
              <li key={s.label} title={s.detail}>
                <span className={styles.laneLabel}>{s.label}</span>
                <span className={styles.laneDetail}>{s.detail}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={100} className={styles.notes}>
          <ul>
            {documentNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
