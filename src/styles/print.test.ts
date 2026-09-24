import { readFileSync } from 'node:fs';

// Printing / "Save as PDF" must not drop sections the reader never scrolled to.
it('forces unrevealed content visible when printing', () => {
  const css = readFileSync('src/components/ui/ui.module.css', 'utf8');
  const print = css.match(/@media print\s*{([\s\S]*?)}\s*}/)?.[1] ?? '';
  expect(print).toMatch(/\.reveal[\s\S]*opacity:\s*1\s*!important/);
  expect(print).toMatch(/transform:\s*none\s*!important/);
});
