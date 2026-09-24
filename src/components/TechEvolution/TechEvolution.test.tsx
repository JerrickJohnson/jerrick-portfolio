import { render, screen, within } from '@testing-library/react';
import { TechEvolution } from './TechEvolution';
import { FullStack } from '../FullStack/FullStack';

it('renders the career evolution as five ordered stages under #engineering', () => {
  render(<TechEvolution />);
  expect(document.getElementById('engineering')?.tagName).toBe('SECTION');
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent("The Stack Has Changed. The Engineering Hasn't.");
  const list = screen.getByRole('list', { name: 'Career technology evolution' });
  const titles = within(list)
    .getAllByRole('heading', { level: 3 })
    .map((h) => h.textContent);
  expect(titles).toEqual(['Enterprise Foundation', 'Business Systems', 'Modern Development', 'Modern Data', "Today's Workflow"]);
});

it('frames SMU as extending an existing foundation', () => {
  render(<FullStack />);
  expect(screen.getByText('Full Stack Web Development Certificate Program')).toBeInTheDocument();
  expect(screen.getByText(/not a first one/i)).toBeInTheDocument();
});
