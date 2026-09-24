import { render, screen } from '@testing-library/react';
import App from './App';
import { navItems } from './data/site';

it('every nav destination exists on the page', () => {
  render(<App />);
  for (const item of navItems) {
    expect(document.getElementById(item.id), item.id).not.toBeNull();
  }
});

it('has exactly one h1 and a skip link to main content', () => {
  render(<App />);
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute('href', '#main');
  expect(document.getElementById('main')?.tagName).toBe('MAIN');
});

it('orders sections to tell the story', () => {
  render(<App />);
  const ids = Array.from(document.querySelectorAll('main > section[id]')).map((s) => s.id);
  expect(ids).toEqual([
    'home',
    'about',
    'experience',
    'engineering',
    'full-stack',
    'projects',
    'skills',
    'philosophy',
    'workflow',
    'resume',
    'contact',
  ]);
});
