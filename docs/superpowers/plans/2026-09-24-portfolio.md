# Jerrick Johnson Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page React + TypeScript portfolio that tells Jerrick Johnson's enterprise-to-modern engineering story, with every claim traceable to his resume or GitHub.

**Architecture:** A static Vite SPA. All copy lives in typed `src/data/*.ts` modules. Section components are presentational and read from data. Styling uses global design tokens plus one CSS Module per component. Motion is a single `Reveal` wrapper driven by an IntersectionObserver hook, and it degrades to fully visible content.

**Tech Stack:** Vite 5, React 18, TypeScript (strict), CSS Modules, Vitest + @testing-library/react + jsdom.

**Spec:** `docs/superpowers/specs/2026-09-24-portfolio-design.md`

## Global Constraints

- Nothing invented: no metrics, proficiency levels, testimonials, clients, or unverified features. Copy must match spec §2.
- Heroku demos are dead → Premier, Homeward Bound and Tech Blog get **no** `live` link. Only Weather Dashboard (`https://jerrickjohnson.github.io/5-Day-Weather-Forecast/`) and Movie Watchlist (`https://shannonkprice00.github.io/movie-watchlist/`) have `live`.
- Team projects carry a team label: Premier (team of 5), Homeward Bound (team of 4), Movie Watchlist (team of 4).
- No location shown. No resume page-2 roles shown.
- Accent meaning: amber = enterprise, cyan = modern, gradient only where they meet.
- No UI or animation libraries. All motion is off under `prefers-reduced-motion: reduce`.
- Asset URLs are built from `import.meta.env.BASE_URL` (GitHub Pages sub-path safe).
- External links: `target="_blank" rel="noopener noreferrer"`.
- Nav ids: `home`, `experience`, `engineering`, `projects`, `resume`, `contact`.

## Review Focus

1. **IntersectionObserver unavailable / JS reveal never fires** → content must still be visible. Test in Task 3.
2. **Reduced-motion users** → no reveal transitions and no path animation. Test in Task 3 (hook), plus CSS media queries in Tasks 1 and 5.
3. **Deep links like `/#projects` under the sticky nav** → the heading must not be hidden behind the nav (`scroll-margin-top` on sections). Test in Task 3 (Section renders the id; CSS rule in global.css).
4. **Mobile menu open, then a link is tapped or Escape is pressed** → the menu closes, `aria-expanded` resets and body scroll is restored. Test in Task 4.
5. **Site deployed under a sub-path** → the resume link resolves via `BASE_URL`, not `/`. Test in Task 1.

---

## File Structure

```
index.html                       fonts, meta, #root
vite.config.ts                   react plugin, base, vitest config
src/main.tsx                     mount
src/App.tsx                      section order
src/styles/tokens.css            colors, type, spacing, radii
src/styles/global.css            reset, body, focus, section scroll-margin, reduced motion
src/data/types.ts                shared content types
src/data/site.ts                 name, links, resumeUrl, nav
src/data/experience.ts           role, work groups, CAT highlight, document pipeline
src/data/timeline.ts             5 evolution stages
src/data/projects.ts             featured + secondary projects
src/data/skills.ts               6 skill groups, principles, AI uses
src/hooks/useInView.ts           IO hook with no-IO fallback
src/hooks/useActiveSection.ts    active nav id
src/components/ui/*              Section, SectionLabel, Tag, Button, Reveal
src/components/<Section>/*.tsx + .module.css
src/test/setup.ts                jest-dom
public/Jerrick_Johnson_Resume.pdf
```

---

### Task 1: Scaffold, tokens, site data

**Files:** Create `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx` (placeholder shell), `src/styles/tokens.css`, `src/styles/global.css`, `src/data/types.ts`, `src/data/site.ts`, `src/test/setup.ts`, `src/data/site.test.ts`; copy the resume PDF into `public/`.

**Interfaces — Produces:**
```ts
// src/data/site.ts
export const site: { name: string; title: string; headline: string; summary: string;
  email: string; github: string; linkedin: string; resumeUrl: string };
export const navItems: { id: SectionId; label: string }[];
export type SectionId = 'home'|'experience'|'engineering'|'projects'|'resume'|'contact';
```

- [ ] **Step 1: Scaffold.** Run `npm create vite@latest . -- --template react-ts`, then `npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom @types/node`. Add `"test": "vitest run"` to the scripts. In `vite.config.ts`, set `base: process.env.BASE_PATH ?? '/'` and `test: { environment: 'jsdom', setupFiles: './src/test/setup.ts', css: { modules: { classNameStrategy: 'non-scoped' } } }`.
- [ ] **Step 2: Copy the resume.** Copy `C:\Users\jerri\OneDrive\Desktop\Jerrick_Johnson_Software_Engineer_II_Resume.pdf` → `public/Jerrick_Johnson_Resume.pdf`.
- [ ] **Step 3: Write the failing test** `src/data/site.test.ts`:
```ts
import { existsSync } from 'node:fs';
import { site, navItems } from './site';
it('builds resume url from BASE_URL', () => {
  expect(site.resumeUrl).toBe(`${import.meta.env.BASE_URL}Jerrick_Johnson_Resume.pdf`);
  expect(existsSync('public/Jerrick_Johnson_Resume.pdf')).toBe(true);
});
it('has confirmed contact links', () => {
  expect(site.email).toBe('jerrickjohnson88@gmail.com');
  expect(site.linkedin).toBe('https://www.linkedin.com/in/jerrick-johnson-6bbbba182/');
  expect(site.github).toBe('https://github.com/JerrickJohnson');
});
it('nav matches spec', () => {
  expect(navItems.map(n => n.id)).toEqual(['home','experience','engineering','projects','resume','contact']);
});
```
- [ ] **Step 4: Run it and confirm it fails.** Run `npm test` → FAIL (module not found).
- [ ] **Step 5: Implement `site.ts`, tokens and global CSS.**
  - `site.ts` copy:
    - title "Software Engineer II"
    - headline "From enterprise systems to modern applications."
    - summary "Experienced software engineer specializing in IBM i, RPGLE, CL, SQL, enterprise application development, and document processing — with modern full-stack development experience across JavaScript, React, Node.js, GraphQL, MySQL, and MongoDB."
  - Tokens: `--bg #0a0d14`, `--surface #0f131c`, `--surface-2 #141926`, `--line rgba(255,255,255,.08)`, `--text #e8ebf2`, `--muted #9aa3b5`, `--amber #f0a44b`, `--cyan #4cc9f0`, `--grad linear-gradient(90deg,var(--amber),var(--cyan))`, `--font-sans 'Inter Tight'`, `--font-mono 'JetBrains Mono'`, `--nav-h 64px`.
  - `global.css`: `section[id]{scroll-margin-top:calc(var(--nav-h) + 16px)}`, a `:focus-visible` outline, and a `@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation:none!important;transition:none!important}}` rule.
- [ ] **Step 6: Run `npm test` and confirm it passes.**
- [ ] **Step 7: Commit** `feat: scaffold vite react-ts app with tokens and site data`.

### Task 2: Content data

**Files:** Create `src/data/types.ts` (extend), `experience.ts`, `timeline.ts`, `projects.ts`, `skills.ts`, `src/data/content.test.ts`.

**Interfaces — Produces:**
```ts
export interface Project { slug: string; name: string; tagline: string; whatItIs: string;
  builtWith: string[]; demonstrates: string[]; repo: string; live?: string;
  team?: string; size: 'featured'|'wide'|'pair'|'compact' }
export interface FeaturedProject extends Project { problem: string; features: string[];
  myRole: string[]; architecture: { client: string[]; api: string[]; data: string[]; services: string[] };
  screenshots: { src: string; alt: string }[] }
export interface Stage { id: string; title: string; caption: string; tags: string[]; tone: 'amber'|'blend'|'cyan' }
export interface SkillGroup { title: string; tone: 'amber'|'cyan'; items: string[] }
export const featured: FeaturedProject; export const projects: Project[];
export const role, workGroups, catHighlight, printPipeline, docPathSteps; export const stages: Stage[];
export const skillGroups: SkillGroup[]; export const principles: string[]; export const aiUses: string[];
```

- [ ] **Step 1: Write the failing test** `src/data/content.test.ts`:
```ts
import { featured, projects } from './projects';
import { stages } from './timeline';
import { skillGroups } from './skills';
const all = [featured, ...projects];
it('only verified live links', () => {
  const live = Object.fromEntries(all.filter(p => p.live).map(p => [p.slug, p.live]));
  expect(live).toEqual({
    weather: 'https://jerrickjohnson.github.io/5-Day-Weather-Forecast/',
    movies: 'https://shannonkprice00.github.io/movie-watchlist/',
  });
});
it('labels team projects', () => {
  expect(featured.team).toBe('Team of 5');
  expect(projects.find(p => p.slug === 'homeward')?.team).toBe('Team of 4');
  expect(projects.find(p => p.slug === 'movies')?.team).toBe('Team of 4');
});
it('every project answers what / built with / demonstrates', () => {
  for (const p of all) { expect(p.whatItIs).toBeTruthy(); expect(p.builtWith.length).toBeGreaterThan(0); expect(p.demonstrates.length).toBeGreaterThan(0); }
});
it('no metric-like claims in copy', () => {
  const text = JSON.stringify({ all, stages, skillGroups });
  expect(text).not.toMatch(/\d+\s?%|\b\d+x\b|years? of experience|expert|proficien/i);
});
it('timeline has 5 ordered stages', () => {
  expect(stages.map(s => s.title)).toEqual(['Enterprise Foundation','Business Systems','Modern Development','Modern Data',"Today's Workflow"]);
});
```
- [ ] **Step 2: Run it and confirm it fails.**
- [ ] **Step 3: Write the data files,** taking the copy only from spec §2 and the resume. Premier `myRole` = the seller marketplace items from spec §2. Screenshots use the three GitHub attachment URLs from the Premier README.
- [ ] **Step 4: Run `npm test` and confirm it passes.**
- [ ] **Step 5: Commit** `feat: add verified content data`.

### Task 3: UI primitives and hooks

**Files:** Create `src/hooks/useInView.ts`, `src/hooks/useActiveSection.ts`, `src/components/ui/{Section,SectionLabel,Tag,Button,Reveal}.tsx` + `ui.module.css`, `src/components/ui/ui.test.tsx`.

**Interfaces — Produces:**
```ts
useInView<T extends Element>(opts?: IntersectionObserverInit): [React.RefObject<T>, boolean]
// returns true immediately when IntersectionObserver is undefined or reduced motion is set; unobserves after first intersect
useActiveSection(ids: string[]): string
<Section id? tone?: 'base'|'raised' labelIndex?: string label?: string title: ReactNode intro?: ReactNode>
<Reveal delay?: number as?: keyof JSX.IntrinsicElements>
<Tag tone?: 'amber'|'cyan'|'neutral'>; <Button href variant: 'primary'|'ghost' external? download?>
```

- [ ] **Step 1: Write the failing tests:**
```tsx
import { render, screen } from '@testing-library/react';
import { Reveal } from './Reveal'; import { Section } from './Section';
it('Reveal shows content when IntersectionObserver is missing', () => {
  const IO = (globalThis as any).IntersectionObserver; delete (globalThis as any).IntersectionObserver;
  render(<Reveal><p>hello</p></Reveal>);
  expect(screen.getByText('hello').closest('[data-visible]')).toHaveAttribute('data-visible', 'true');
  (globalThis as any).IntersectionObserver = IO;
});
it('Reveal is visible under reduced motion', () => {
  window.matchMedia = ((q: string) => ({ matches: q.includes('reduce'), addEventListener(){}, removeEventListener(){} })) as any;
  (globalThis as any).IntersectionObserver = class { observe(){} unobserve(){} disconnect(){} };
  render(<Reveal><p>calm</p></Reveal>);
  expect(screen.getByText('calm').closest('[data-visible]')).toHaveAttribute('data-visible', 'true');
});
it('Section exposes id for deep links and an h2', () => {
  render(<Section id="projects" title="Selected Work">x</Section>);
  expect(document.getElementById('projects')?.tagName).toBe('SECTION');
  expect(screen.getByRole('heading', { level: 2, name: 'Selected Work' })).toBeInTheDocument();
});
```
- [ ] **Step 2: Run it and confirm it fails. Step 3: Implement. Step 4: Run it and confirm it passes.**
- [ ] **Step 5: Commit** `feat: add ui primitives and in-view hooks`.

### Task 4: Navigation

**Files:** Create `src/components/Navigation/Navigation.tsx`, `.module.css`, `Navigation.test.tsx`.

The sticky bar has the name mark on the left and links plus a "Resume" button on the right. Below 860px it shows a menu button that opens a full-screen panel. `aria-current="true"` goes on the active link (from `useActiveSection`). The bar gains a border and blur after the page is scrolled.

- [ ] **Step 1: Write the failing test:**
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from './Navigation';
it('mobile menu toggles, closes on Escape and on link click, restores scroll', () => {
  render(<Navigation />);
  const btn = screen.getByRole('button', { name: /menu/i });
  fireEvent.click(btn);
  expect(btn).toHaveAttribute('aria-expanded', 'true');
  expect(document.body.style.overflow).toBe('hidden');
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(btn).toHaveAttribute('aria-expanded', 'false');
  expect(document.body.style.overflow).toBe('');
  fireEvent.click(btn);
  fireEvent.click(screen.getAllByRole('link', { name: 'Projects' }).at(-1)!);
  expect(btn).toHaveAttribute('aria-expanded', 'false');
});
```
- [ ] **Steps 2–4: Confirm it fails, implement, confirm it passes. Step 5: Commit** `feat: add sticky navigation with mobile menu`.

### Task 5: Hero + ConvergenceVisual

**Files:** `src/components/Hero/*`, `src/components/ConvergenceVisual/*`, `Hero.test.tsx`.

- **Hero:** eyebrow "Jerrick Johnson" (h1 contains the name), a mono "Software Engineer II" line, and the headline as a large display line. It shows the summary and the CTAs Explore My Work (`#projects`, primary) and View Resume (`site.resumeUrl`, ghost, new tab), then small GitHub/LinkedIn links.
- **ConvergenceVisual:** an SVG with `viewBox 0 0 560 440`.
  - Left nodes (amber) at x=40 and right nodes (cyan) at x=440; the center node is at 280,220.
  - Paths are cubic Béziers from each node to the center, `stroke-dasharray` 4 8, animated with `dashoffset` (CSS, 12s linear). Hover or focus on a node adds `data-active` to its path.
  - Below 720px it renders a stacked HTML version instead (a CSS `display` swap).
  - `aria-hidden` on the SVG, with an `sr-only` sentence describing it.
- [ ] **Step 1: Failing test:** h1 name "Jerrick Johnson", the headline text, "View Resume" href === `site.resumeUrl`, and "Explore My Work" href `#projects`.
- [ ] **Steps 2–4. Step 5: Commit** `feat: hero with convergence visual`.

### Task 6: EngineeringSnapshot, Experience, DocumentPipeline

**Files:** `src/components/{EngineeringSnapshot,Experience,DocumentPipeline}/*`, `Experience.test.tsx`.

- **Snapshot:** "More Than One Stack", 3 paragraphs, and 3 fact chips.
- **Experience** (`id="experience"`): role header; `workGroups` as a 2×2 grid; the CAT highlight card with an amber border and its tech tags.
- **DocumentPipeline:** "Enterprise Document Processing". An ordered list (`<ol>`) of 5 steps connected by lines, horizontal ≥900px and vertical below, plus a DocPath lane.
- [ ] **Step 1: Failing test:** it renders "CRC Group / Wellington Insurance Group", "September 2021 – Present", "Texas CAT Code Assignment", and pipeline steps in order ["RPGLE program","O-specs & printer files","Spooled files","ALP print workflow","Printed insured documents"].
- [ ] **Steps 2–4. Step 5: Commit** `feat: experience and document pipeline`.

### Task 7: TechEvolution + FullStack

- **TechEvolution** (`id="engineering"`): an `<ol>` of stages. The rail is a pseudo-element whose `--progress` (0–1) is set from a scroll listener throttled by rAF over the section's bounding box. Each stage dot is tinted by `tone`. Mobile uses a left rail.
- **FullStack:** the SMU card plus capability groups.
- [ ] **Step 1: Failing test:** 5 list items in order, with `aria-label` "Career technology evolution".
- [ ] **Steps 2–4. Step 5: Commit** `feat: technology evolution timeline and full-stack section`.

### Task 8: Projects

**Files:** `src/components/{Projects,FeaturedProject,ProjectCard}/*`, `Projects.test.tsx`.

- **FeaturedProject:** a 2-column case study (copy | screenshot stack), then a row with the architecture mini-diagram (4 labeled lanes), Key features, My Role (cyan border), Demonstrates, and the GitHub button. Screenshots use `loading="lazy"`, a fixed `aspect-ratio: 16/10` and `object-fit: cover` so a broken image doesn't collapse the layout.
- **ProjectCard:** `size` drives the grid span. It shows the What / Built with / Demonstrates labels, the team badge, and repo plus live links.
- [ ] **Step 1: Failing test:** each project name renders. There are exactly 2 "Live demo" links, pointing at the weather/movies URLs. Every GitHub link has `rel="noopener noreferrer"`. "Team of 5" appears.
- [ ] **Steps 2–4. Step 5: Commit** `feat: selected work section`.

### Task 9: Skills, Philosophy, AIWorkflow, ResumeCTA, Contact, Footer

- [ ] **Step 1: Failing test:** six skill group headings; the ResumeCTA download link has the `download` attribute and `site.resumeUrl`; Contact has `mailto:jerrickjohnson88@gmail.com`; sections `resume` and `contact` exist.
- [ ] **Steps 2–4. Step 5: Commit** `feat: skills, philosophy, workflow, resume and contact sections`.

### Task 10: Assemble and verify

- [ ] **Step 1: Failing test** `App.test.tsx`: every `navItems` id exists as an element; exactly one h1.
- [ ] **Step 2: Wire up `App.tsx`** in spec order with a skip link. Confirm it passes.
- [ ] **Step 3:** `npm run build` → no TS errors.
- [ ] **Step 4:** Add a `.claude/launch.json` entry for `npm run dev` (port 5173). Check it in the in-app browser at 1440 / 768 / 375 and fix issues.
- [ ] **Step 5:** Content audit against spec §2.
- [ ] **Step 6: Commit** `feat: assemble portfolio page`.
