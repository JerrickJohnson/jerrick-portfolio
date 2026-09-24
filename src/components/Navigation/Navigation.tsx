import { useCallback, useEffect, useRef, useState } from 'react';
import { navItems, site } from '../../data/site';
import { useActiveSection } from '../../hooks/useActiveSection';
import styles from './Navigation.module.css';

const sectionIds = navItems.map((n) => n.id);

export function Navigation() {
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>('a')].filter(
        Boolean,
      ) as HTMLElement[];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 860) close(false);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open, close]);

  return (
    <header className={`${styles.bar} ${scrolled || open ? styles.scrolled : ''}`}>
      <nav aria-label="Primary" className={styles.inner}>
        <a href="#home" className={styles.brand} aria-label={`${site.name}, back to top`}>
          <span aria-hidden="true" className={styles.mark}>
            <span className={styles.markA}>J</span>
            <span className={styles.markC}>J</span>
          </span>
          <span className={styles.brandName}>{site.name}</span>
        </a>

        <ul className={styles.links}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={styles.link}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.toggleLines} data-open={open} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </nav>

      <div
        id="site-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={styles.panel}
        data-open={open}
        hidden={!open}
      >
        <ol className={styles.panelLinks}>
          {navItems.map((item, i) => (
            <li key={item.id} style={{ '--i': i } as React.CSSProperties}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                onClick={() => close(false)}
              >
                <span className={styles.panelIndex}>0{i + 1}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
        <div className={styles.panelFoot}>
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`}>Email</a>
        </div>
      </div>
    </header>
  );
}
