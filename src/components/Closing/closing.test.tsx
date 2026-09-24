import { render, screen } from '@testing-library/react';
import { Skills } from '../Skills/Skills';
import { Philosophy } from '../Philosophy/Philosophy';
import { AIWorkflow } from '../AIWorkflow/AIWorkflow';
import { ResumeCTA } from '../ResumeCTA/ResumeCTA';
import { Contact } from '../Contact/Contact';
import { Footer } from '../Footer/Footer';
import { site } from '../../data/site';

it('groups skills into the six engineering areas', () => {
  render(<Skills />);
  const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
  expect(titles).toEqual([
    'Enterprise Engineering',
    'Data & Business Systems',
    'Document Processing',
    'Modern Web',
    'Databases',
    'Development Workflow',
  ]);
});

it('states the engineering philosophy', () => {
  render(<Philosophy />);
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Different Technologies. Same Engineering Principles.');
});

it('frames AI as a building workflow, not AI/ML engineering', () => {
  render(<AIWorkflow />);
  expect(screen.getByRole('heading', { level: 2, name: 'Building with AI' })).toBeInTheDocument();
  expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(5);
  expect(document.body.textContent).not.toMatch(/machine learning|ML engineer|AI engineer/i);
});

it('backs the AI workflow with two real examples', () => {
  render(<AIWorkflow />);
  expect(screen.getByRole('heading', { level: 3, name: 'Datebook' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 3, name: 'This portfolio' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /see datebook/i })).toHaveAttribute('href', '#datebook');
});

it('resume CTA downloads the PDF from the base-aware url', () => {
  render(<ResumeCTA />);
  expect(document.getElementById('resume')?.tagName).toBe('SECTION');
  const dl = screen.getByRole('link', { name: /download resume/i });
  expect(dl).toHaveAttribute('href', site.resumeUrl);
  expect(dl).toHaveAttribute('download');
});

it('contact offers email and LinkedIn', () => {
  render(<Contact />);
  expect(document.getElementById('contact')?.tagName).toBe('SECTION');
  expect(screen.getByRole('link', { name: site.email })).toHaveAttribute('href', `mailto:${site.email}`);
  expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', site.linkedin);
});

it('footer offers a way back to the top', () => {
  render(<Footer />);
  expect(screen.getByRole('link', { name: /back to top/i })).toHaveAttribute('href', '#home');
});
