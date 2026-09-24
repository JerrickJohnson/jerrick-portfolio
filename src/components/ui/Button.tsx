import type { ReactNode } from 'react';
import styles from './ui.module.css';

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'text';
  external?: boolean;
  download?: boolean | string;
  className?: string;
}

export function Button({ href, children, variant = 'primary', external, download, className = '' }: ButtonProps) {
  return (
    <a
      href={href}
      className={`${styles.button} ${styles[variant]} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: download === true ? '' : download } : {})}
    >
      {children}
    </a>
  );
}

export function ArrowIcon({ direction = 'right' }: { direction?: 'right' | 'down' | 'up-right' }) {
  const rotate = direction === 'down' ? 90 : direction === 'up-right' ? -45 : 0;
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
