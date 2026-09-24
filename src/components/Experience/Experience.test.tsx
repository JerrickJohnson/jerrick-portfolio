import { render, screen, within } from '@testing-library/react';
import { Experience } from './Experience';
import { EngineeringSnapshot } from '../EngineeringSnapshot/EngineeringSnapshot';

it('shows the role exactly as on the resume', () => {
  render(<Experience />);
  expect(screen.getByText('CRC Group / Wellington Insurance Group')).toBeInTheDocument();
  expect(screen.getByText('September 2021 – Present')).toBeInTheDocument();
  expect(document.getElementById('experience')?.tagName).toBe('SECTION');
});

it('highlights the Texas CAT Code Assignment work', () => {
  render(<Experience />);
  expect(screen.getByRole('heading', { name: 'Texas CAT Code Assignment' })).toBeInTheDocument();
});

it('presents the print pipeline as an ordered sequence', () => {
  render(<Experience />);
  const list = screen.getByRole('list', { name: /print pipeline/i });
  const labels = within(list)
    .getAllByRole('listitem')
    .map((li) => li.querySelector('h4')?.textContent);
  expect(labels).toEqual([
    'RPGLE program',
    'O-specs & printer files',
    'Spooled files',
    'ALP print workflow',
    'Printed insured documents',
  ]);
  expect(screen.getByRole('heading', { name: /enterprise document processing/i })).toBeInTheDocument();
  expect(screen.getByText(/DocPath Designer/)).toBeInTheDocument();
});

it('snapshot introduces the More Than One Stack story', () => {
  render(<EngineeringSnapshot />);
  expect(screen.getByRole('heading', { level: 2, name: /more than one stack/i })).toBeInTheDocument();
});

it('links the document-processing work to the Datebook tool', () => {
  render(<Experience />);
  expect(screen.getByRole('link', { name: /datebook/i })).toHaveAttribute('href', '#datebook');
});
