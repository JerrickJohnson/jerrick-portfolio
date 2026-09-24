import { render, screen } from '@testing-library/react';
import { Projects } from './Projects';
import { featured, projects } from '../../data/projects';

it('renders every project under #projects', () => {
  render(<Projects />);
  expect(document.getElementById('projects')?.tagName).toBe('SECTION');
  for (const p of [featured, ...projects]) {
    expect(screen.getByRole('heading', { name: p.name })).toBeInTheDocument();
  }
});

it('shows live demo links only where a demo actually loads', () => {
  render(<Projects />);
  const live = screen.getAllByRole('link', { name: /live demo/i }).map((a) => a.getAttribute('href'));
  expect(live.sort()).toEqual(
    ['https://jerrickjohnson.github.io/5-Day-Weather-Forecast/', 'https://shannonkprice00.github.io/movie-watchlist/'].sort(),
  );
});

it('opens every external link safely', () => {
  render(<Projects />);
  const external = screen.getAllByRole('link').filter((a) => a.getAttribute('href')?.startsWith('http'));
  expect(external.length).toBeGreaterThan(0);
  for (const a of external) {
    expect(a).toHaveAttribute('rel', 'noopener noreferrer');
    expect(a).toHaveAttribute('target', '_blank');
  }
});

it('credits the team and states Jerrick’s own role on the featured project', () => {
  render(<Projects />);
  expect(screen.getByText('Team of 5')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /my role/i })).toBeInTheDocument();
});

it('answers what / built with / demonstrates for each project', () => {
  render(<Projects />);
  expect(screen.getAllByText(/^Demonstrates$/)).toHaveLength(1 + projects.length);
});

it('spotlights Datebook with an AI badge, a how-it-was-built panel, and an anchor', () => {
  render(<Projects />);
  const card = document.getElementById('datebook');
  expect(card?.tagName).toBe('ARTICLE');
  expect(card).toHaveTextContent(/built with AI/i);
  expect(screen.getByRole('heading', { name: /how i built it with ai/i })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /datebook/i })).toHaveAttribute('src', expect.stringContaining('projects/datebook.webp'));
});

it('links Datebook to its Windows release', () => {
  render(<Projects />);
  const dl = screen.getByRole('link', { name: /download datebook for windows/i });
  expect(dl).toHaveAttribute('href', 'https://github.com/JerrickJohnson/Date_Calculator/releases/latest');
  expect(dl).toHaveAttribute('rel', 'noopener noreferrer');
});

it('nests additional-work card titles under their h3', () => {
  render(<Projects />);
  for (const name of ['Tech Blog', 'NoSQL Social Network API', 'JATE Text Editor']) {
    expect(screen.getByRole('heading', { level: 4, name })).toBeInTheDocument();
  }
  expect(screen.getByRole('heading', { level: 3, name: 'Additional work' })).toBeInTheDocument();
});
