import { useEffect } from 'react';

/**
 * A deep link like /#datebook is scrolled to before the web fonts load; when they
 * swap in, text above the target reflows and the target drifts. Re-scroll once
 * fonts are ready so the link lands where it points.
 */
export function useInitialHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
    let cancelled = false;
    Promise.resolve(fonts?.ready).then(() => {
      if (!cancelled) document.getElementById(id)?.scrollIntoView();
    });
    return () => {
      cancelled = true;
    };
  }, []);
}
