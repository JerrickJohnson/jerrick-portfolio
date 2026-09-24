import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from './Navigation';

afterEach(() => {
  document.body.style.overflow = '';
});

it('mobile menu opens, locks scroll, and closes on Escape', () => {
  render(<Navigation />);
  const btn = screen.getByRole('button', { name: /menu/i });
  expect(btn).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(btn);
  expect(btn).toHaveAttribute('aria-expanded', 'true');
  expect(document.body.style.overflow).toBe('hidden');

  fireEvent.keyDown(document, { key: 'Escape' });
  expect(btn).toHaveAttribute('aria-expanded', 'false');
  expect(document.body.style.overflow).toBe('');
});

it('mobile menu closes when a link is chosen', () => {
  render(<Navigation />);
  const btn = screen.getByRole('button', { name: /menu/i });
  fireEvent.click(btn);
  const menu = screen.getByRole('dialog', { name: /site menu/i });
  fireEvent.click(menu.querySelector('a[href="#projects"]')!);
  expect(btn).toHaveAttribute('aria-expanded', 'false');
  expect(document.body.style.overflow).toBe('');
});

it('renders every nav destination as an in-page link', () => {
  render(<Navigation />);
  const nav = screen.getByRole('navigation', { name: /primary/i });
  const hrefs = Array.from(nav.querySelectorAll('a[href^="#"]')).map((a) => a.getAttribute('href'));
  expect(hrefs).toEqual(expect.arrayContaining(['#home', '#experience', '#engineering', '#projects', '#resume', '#contact']));
});
