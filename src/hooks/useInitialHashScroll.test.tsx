import { render, waitFor } from '@testing-library/react';
import { useInitialHashScroll } from './useInitialHashScroll';

function Probe() {
  useInitialHashScroll();
  return <div id="target" />;
}

const original = Element.prototype.scrollIntoView;

afterEach(() => {
  Element.prototype.scrollIntoView = original;
  // Drop the instance override so document.readyState reads the real value again
  delete (document as { readyState?: unknown }).readyState;
  window.history.replaceState(null, '', '/');
});

it('re-scrolls to the URL hash target once web fonts have loaded', async () => {
  window.history.replaceState(null, '', '/#target');
  Object.defineProperty(document, 'fonts', { value: { ready: Promise.resolve() }, configurable: true });
  const calls: Element[] = [];
  const options: unknown[] = [];
  Element.prototype.scrollIntoView = function (this: Element, arg?: unknown) {
    calls.push(this);
    options.push(arg);
  };

  render(<Probe />);

  await waitFor(() => expect(calls).toHaveLength(1));
  expect(calls[0]?.id).toBe('target');
  // A smooth scroll gets cancelled by the browser's own load-time scrolling on the live site
  expect(options[0]).toEqual({ behavior: 'instant', block: 'start' });
});

it('waits for the page load event before scrolling', async () => {
  window.history.replaceState(null, '', '/#target');
  Object.defineProperty(document, 'fonts', { value: { ready: Promise.resolve() }, configurable: true });
  Object.defineProperty(document, 'readyState', { value: 'interactive', configurable: true });
  const calls: Element[] = [];
  Element.prototype.scrollIntoView = function (this: Element) {
    calls.push(this);
  };

  render(<Probe />);
  await Promise.resolve();
  await Promise.resolve();
  expect(calls).toHaveLength(0);

  Object.defineProperty(document, 'readyState', { value: 'complete', configurable: true });
  window.dispatchEvent(new Event('load'));
  await waitFor(() => expect(calls).toHaveLength(1));
});

it('does nothing without a hash', async () => {
  Object.defineProperty(document, 'fonts', { value: { ready: Promise.resolve() }, configurable: true });
  const calls: Element[] = [];
  Element.prototype.scrollIntoView = function (this: Element) {
    calls.push(this);
  };

  render(<Probe />);
  await Promise.resolve();
  await Promise.resolve();

  expect(calls).toHaveLength(0);
});
