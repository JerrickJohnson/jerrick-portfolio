import { render, screen } from '@testing-library/react';
import { Reveal } from './Reveal';
import { Section } from './Section';
import { Button } from './Button';

const originalIO = globalThis.IntersectionObserver;
const originalMM = window.matchMedia;

afterEach(() => {
  globalThis.IntersectionObserver = originalIO;
  window.matchMedia = originalMM;
});

function stubMatchMedia(reduce: boolean) {
  window.matchMedia = ((q: string) => ({
    matches: reduce && q.includes('reduce'),
    media: q,
    addEventListener() {},
    removeEventListener() {},
  })) as unknown as typeof window.matchMedia;
}

class InertIO {
  observe() {}
  unobserve() {}
  disconnect() {}
}

it('Reveal shows content when IntersectionObserver is unavailable', () => {
  stubMatchMedia(false);
  // @ts-expect-error simulate an environment without IO
  delete globalThis.IntersectionObserver;
  render(<Reveal><p>hello</p></Reveal>);
  expect(screen.getByText('hello').closest('[data-visible]')).toHaveAttribute('data-visible', 'true');
});

it('Reveal is visible immediately under reduced motion', () => {
  stubMatchMedia(true);
  globalThis.IntersectionObserver = InertIO as unknown as typeof IntersectionObserver;
  render(<Reveal><p>calm</p></Reveal>);
  expect(screen.getByText('calm').closest('[data-visible]')).toHaveAttribute('data-visible', 'true');
});

it('Reveal waits for intersection when motion is allowed', () => {
  stubMatchMedia(false);
  globalThis.IntersectionObserver = InertIO as unknown as typeof IntersectionObserver;
  render(<Reveal><p>later</p></Reveal>);
  expect(screen.getByText('later').closest('[data-visible]')).toHaveAttribute('data-visible', 'false');
});

it('Section exposes its id for deep links and renders an h2', () => {
  render(<Section id="projects" title="Selected Work">x</Section>);
  expect(document.getElementById('projects')?.tagName).toBe('SECTION');
  expect(screen.getByRole('heading', { level: 2, name: 'Selected Work' })).toBeInTheDocument();
});

it('external Button opens safely in a new tab', () => {
  render(<Button href="https://example.com" external>Go</Button>);
  const link = screen.getByRole('link', { name: /go/i });
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});
