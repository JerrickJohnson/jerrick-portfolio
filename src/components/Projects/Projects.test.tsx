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
