import { useEffect, useRef, useState } from 'react';

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
}

/**
 * Reports whether an element has entered the viewport (once).
 * Starts visible when IntersectionObserver is unavailable or the user
 * prefers reduced motion, so content is never hidden behind an effect.
 */
export function useInView<T extends Element>(
  options: IntersectionObserverInit = { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === 'undefined' || prefersReducedMotion(),
  );

  useEffect(() => {
    if (inView || !ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
    // options are static per call site
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return [ref, inView];
}
