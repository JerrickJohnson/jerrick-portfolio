import type { ReactNode } from 'react';
import styles from './ui.module.css';

export function SectionLabel({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <p className={styles.label}>
      <span aria-hidden="true" className={styles.labelSlash}>
        //
      </span>
      {index && <span className={styles.labelIndex}>{index}</span>}
      <span>{children}</span>
    </p>
  );
}
