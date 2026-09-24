import type { ReactNode } from 'react';
import { SectionLabel } from './SectionLabel';
import styles from './ui.module.css';

interface SectionProps {
  id?: string;
  tone?: 'base' | 'raised';
  index?: string;
  label?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function Section({ id, tone = 'base', index, label, title, intro, children, className = '' }: SectionProps) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${styles[tone]} ${className}`}>
      <div className={styles.container}>
        <header className={styles.sectionHead}>
          {label && <SectionLabel index={index}>{label}</SectionLabel>}
          <h2 id={headingId} className={styles.sectionTitle}>
            {title}
          </h2>
          {intro && <p className={styles.sectionIntro}>{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
