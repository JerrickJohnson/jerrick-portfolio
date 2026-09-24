import type { ReactNode } from 'react';
import type { Tone } from '../../data/types';
import styles from './ui.module.css';

export function Tag({ tone = 'neutral', children }: { tone?: Tone | 'neutral'; children: ReactNode }) {
  return <span className={`${styles.tag} ${styles[`tag_${tone}`]}`}>{children}</span>;
}

export function TagList({ items, tone }: { items: string[]; tone?: Tone | 'neutral' }) {
  return (
    <ul className={styles.tagList}>
      {items.map((item) => (
        <li key={item}>
          <Tag tone={tone}>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
