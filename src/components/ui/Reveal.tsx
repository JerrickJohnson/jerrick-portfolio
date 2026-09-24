import type { CSSProperties, ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';
import styles from './ui.module.css';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const [ref, visible] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-visible={visible ? 'true' : 'false'}
      className={`${styles.reveal} ${className}`}
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
