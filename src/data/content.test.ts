import { featured, projects } from './projects';
import { stages } from './timeline';
import { skillGroups } from './skills';
import { role, printPipeline } from './experience';

const all = [featured, ...projects];

it('only has live links that were verified to load', () => {
  const live = Object.fromEntries(all.filter((p) => p.live).map((p) => [p.slug, p.live]));
  expect(live).toEqual({
    weather: 'https://jerrickjohnson.github.io/5-Day-Weather-Forecast/',
    movies: 'https://shannonkprice00.github.io/movie-watchlist/',
  });
});

it('labels team projects', () => {
  expect(featured.team).toBe('Team of 5');
  expect(projects.find((p) => p.slug === 'homeward')?.team).toBe('Team of 4');
  expect(projects.find((p) => p.slug === 'movies')?.team).toBe('Team of 4');
});

it('every project answers what / built with / demonstrates', () => {
  for (const p of all) {
    expect(p.whatItIs, p.slug).toBeTruthy();
    expect(p.builtWith.length, p.slug).toBeGreaterThan(0);
    expect(p.demonstrates.length, p.slug).toBeGreaterThan(0);
  }
});

it('contains no metric-like or proficiency claims', () => {
  const text = JSON.stringify({ all, stages, skillGroups, role });
  expect(text).not.toMatch(/\d+\s?%|\b\d+x\b|years? of experience|expert|proficien/i);
});

it('timeline has the 5 stages in order', () => {
  expect(stages.map((s) => s.title)).toEqual([
    'Enterprise Foundation',
    'Business Systems',
    'Modern Development',
    'Modern Data',
    "Today's Workflow",
  ]);
});

it('role matches the resume', () => {
  expect(role.company).toBe('CRC Group / Wellington Insurance Group');
  expect(role.dates).toBe('September 2021 – Present');
  expect(printPipeline.map((s) => s.label)).toEqual([
    'RPGLE program',
    'O-specs & printer files',
    'Spooled files',
    'ALP print workflow',
    'Printed insured documents',
  ]);
});

describe('Datebook (AI-assisted work tool)', () => {
  const datebook = projects.find((p) => p.slug === 'datebook');

  it('is the first project after the featured case study', () => {
    expect(projects[0]?.slug).toBe('datebook');
  });

  it('credits the AI assistance and explains the work problem it solves', () => {
    expect(datebook?.aiAssisted).toBe(true);
    expect(datebook?.origin).toMatch(/testing/i);
    expect(datebook?.origin).toMatch(/insured/i);
    expect(datebook?.repo).toBe('https://github.com/JerrickJohnson/Date_Calculator');
  });

  it('claims only the four roles Jerrick confirmed', () => {
    const roles = datebook?.howBuilt ?? [];
    expect(roles).toHaveLength(5);
    expect(roles.join(' ')).toMatch(/defined the features/i);
    expect(roles.join(' ')).toMatch(/reviewed the code/i);
    expect(roles.join(' ')).toMatch(/tested it against real date cycles/i);
    expect(roles.join(' ')).toMatch(/built the windows installer/i);
  });

  it('offers the published Windows release, not a live web demo', () => {
    expect(datebook?.live).toBeUndefined();
    expect(datebook?.download).toEqual({
      href: 'https://github.com/JerrickJohnson/Date_Calculator/releases/latest',
      label: 'Download for Windows',
    });
  });
});

it('includes the PWA text editor as additional work, without a dead demo link', () => {
  const pwa = projects.find((p) => p.slug === 'jate');
  expect(pwa?.size).toBe('compact');
  expect(pwa?.live).toBeUndefined();
  expect(pwa?.builtWith).toEqual(expect.arrayContaining(['IndexedDB', 'Workbox', 'webpack']));
});
