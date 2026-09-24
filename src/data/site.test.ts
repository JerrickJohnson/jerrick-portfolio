import { existsSync } from 'node:fs';
import { site, navItems } from './site';

it('builds resume url from BASE_URL so sub-path deploys work', () => {
  expect(site.resumeUrl).toBe(`${import.meta.env.BASE_URL}Jerrick_Johnson_Resume.pdf`);
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
