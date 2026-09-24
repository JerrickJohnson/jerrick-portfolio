import { render, waitFor } from '@testing-library/react';
import { useInitialHashScroll } from './useInitialHashScroll';

function Probe() {
  useInitialHashScroll();
  return <div id="target" />;
}

const original = Element.prototype.scrollIntoView;

afterEach(() => {
  Element.prototype.scrollIntoView = original;
  window.history.replaceState(null, '', '/');
});

it('re-scrolls to the URL hash target once web fonts have loaded', async () => {
  window.history.replaceState(null, '', '/#target');
  Object.defineProperty(document, 'fonts', { value: { ready: Promise.resolve() }, configurable: true });
  const calls: Element[] = [];
  Element.prototype.scrollIntoView = function (this: Element) {
    calls.push(this);
  };

  render(<Probe />);

  await waitFor(() => expect(calls).toHaveLength(1));
  expect(calls[0]?.id).toBe('target');
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
