import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';
import { site } from '../../data/site';

it('identifies Jerrick with a single h1 and the headline', () => {
  render(<Hero />);
  const h1 = screen.getByRole('heading', { level: 1 });
  expect(h1).toHaveTextContent('Jerrick Johnson');
  expect(h1).toHaveTextContent(site.headline);
  expect(screen.getByText('Software Engineer II')).toBeInTheDocument();
});

it('has the primary and resume CTAs', () => {
  render(<Hero />);
  expect(screen.getByRole('link', { name: /explore my work/i })).toHaveAttribute('href', '#projects');
  const resume = screen.getByRole('link', { name: /view resume/i });
  expect(resume).toHaveAttribute('href', site.resumeUrl);
  expect(resume).toHaveAttribute('rel', 'noopener noreferrer');
});

it('describes the convergence visual for screen readers', () => {
  render(<Hero />);
  expect(screen.getByText(/enterprise technologies .* and modern web technologies .* converge on software engineering/i)).toBeInTheDocument();
});
