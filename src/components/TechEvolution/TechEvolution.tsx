import { useEffect, useRef, type CSSProperties } from 'react';
import { stages } from '../../data/timeline';
import type { Tone } from '../../data/types';
import { prefersReducedMotion } from '../../hooks/useInView';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { TagList } from '../ui/Tag';
import styles from './TechEvolution.module.css';

const toneLabel: Record<Tone, string> = {
  amber: 'Enterprise',
  blend: 'Expansion',
  cyan: 'Modern',
};

/** Fills the timeline rail as the reader scrolls through it. */
function useRailProgress(ref: React.RefObject<HTMLOListElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.setProperty('--progress', '1');
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (anchor - rect.top) / Math.max(rect.height, 1)));
      el.style.setProperty('--progress', p.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
}

export function TechEvolution() {
  const listRef = useRef<HTMLOListElement>(null);
  useRailProgress(listRef);

  return (
    <Section
      id="engineering"
      index="03"
      label="Technology evolution"
      title={
        <>
          <span>The Stack Has Changed.</span>{' '}
          <span className={styles.titleAccent}>The Engineering Hasn't.</span>
        </>
      }
      intro="A career progression, not a list of tools. Each stage built on the one before it."
    >
      <ol ref={listRef} className={styles.timeline} aria-label="Career technology evolution" style={{ '--progress': 0 } as CSSProperties}>
        {stages.map((stage, i) => (
          <li key={stage.id} className={styles.stage} data-tone={stage.tone}>
            <span className={styles.marker} aria-hidden="true" />
            <Reveal className={styles.card}>
              <div className={styles.meta}>
                <span className={styles.stageNo}>Stage {String(i + 1).padStart(2, '0')}</span>
                <span className={styles.era}>{toneLabel[stage.tone]}</span>
              </div>
              <div className={styles.content}>
                <h3 className={styles.stageTitle}>{stage.title}</h3>
                <p className={styles.caption}>{stage.caption}</p>
                <TagList items={stage.tags} tone={stage.tone} />
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
