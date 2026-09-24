import { existsSync } from 'node:fs';
import { site, navItems } from './site';

it('builds resume url from BASE_URL so sub-path deploys work', () => {
  expect(import.meta.env.BASE_URL).toBe('/');
  expect(site.resumeUrl).toBe('/Jerrick_Johnson_Resume.pdf');
  expect(existsSync('public/Jerrick_Johnson_Resume.pdf')).toBe(true);
});

it('has the confirmed contact links', () => {
  expect(site.email).toBe('jerrickjohnson88@gmail.com');
  expect(site.linkedin).toBe('https://www.linkedin.com/in/jerrick-johnson-6bbbba182/');
  expect(site.github).toBe('https://github.com/JerrickJohnson');
});

it('nav matches the spec order', () => {
  expect(navItems.map((n) => n.id)).toEqual(['home', 'experience', 'engineering', 'projects', 'resume', 'contact']);
});

it('builds screenshot urls from the same base', async () => {
  const { featured, projects } = await import('./projects');
  const srcs = [...featured.screenshots.map((s) => s.src), ...projects.flatMap((p) => (p.screenshot ? [p.screenshot.src] : []))];
  expect(srcs.length).toBeGreaterThan(0);
  for (const src of srcs) expect(src).toMatch(/^\/projects\/[\w-]+\.webp$/);
});
