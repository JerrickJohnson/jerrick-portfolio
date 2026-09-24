import { render, screen } from '@testing-library/react';
import { useActiveSection } from './useActiveSection';

function Probe() {
  const active = useActiveSection(['a', 'b', 'c']);
  return (
    <>
      <p data-testid="active">{active}</p>
      <section id="a" />
      <section id="b" />
      <section id="c" />
    </>
  );
}

const originalRect = Element.prototype.getBoundingClientRect;

afterEach(() => {
  Element.prototype.getBoundingClientRect = originalRect;
  delete (document.documentElement as { scrollHeight?: number }).scrollHeight;
  window.scrollY = 0;
});

// The hook measures once on mount, so lay the page out before rendering.
function layout(tops: Record<string, number>, page: { innerHeight: number; scrollHeight: number; scrollY: number }) {
  Element.prototype.getBoundingClientRect = function (this: Element) {
    return { top: tops[this.id] ?? 0 } as DOMRect;
  };
  Object.defineProperty(window, 'innerHeight', { value: page.innerHeight, configurable: true });
  Object.defineProperty(document.documentElement, 'scrollHeight', { value: page.scrollHeight, configurable: true });
  window.scrollY = page.scrollY;
}

it('marks the last section active at the bottom of the page, even if it never reaches the line', () => {
  // Tall screen: the last section is short, so its top stays below the 35% line
  layout({ a: -1600, b: -200, c: 900 }, { innerHeight: 1400, scrollHeight: 3000, scrollY: 1600 });
  render(<Probe />);
  expect(screen.getByTestId('active')).toHaveTextContent('c');
});

it('otherwise marks the section under the line', () => {
  layout({ a: -900, b: 100, c: 1600 }, { innerHeight: 1400, scrollHeight: 3000, scrollY: 900 });
  render(<Probe />);
  expect(screen.getByTestId('active')).toHaveTextContent('b');
});
