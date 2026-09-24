import { useEffect } from 'react';

function pageLoaded(): Promise<void> {
  if (document.readyState === 'complete') return Promise.resolve();
  return new Promise((resolve) => window.addEventListener('load', () => resolve(), { once: true }));
}

/**
 * A deep link like /#datebook is scrolled to before the web fonts load; when they
 * swap in, text above the target reflows and the target drifts. Once fonts and the
 * page have loaded, jump to the target. The jump is instant because the browser's
 * own load-time scrolling cancels a smooth scroll partway.
 */
export function useInitialHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
    let cancelled = false;
    Promise.all([fonts?.ready, pageLoaded()]).then(() => {
      if (!cancelled) document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    return () => {
      cancelled = true;
    };
  }, []);
}
