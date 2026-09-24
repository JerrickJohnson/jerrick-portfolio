# Jerrick Johnson Portfolio — Design Spec

Date: 2026-09-24 · Status: approved in chat, pending written-spec review

## 1. Goal

A personal portfolio for Jerrick Johnson, Software Engineer II, aimed at Software Engineer / Software Engineer II / Full-Stack roles.

Central message: *a professional software engineer who understands enterprise systems from the inside out and has expanded that experience into modern full-stack development.*

Success criteria:
- A recruiter understands the enterprise → modern story within the first screen.
- Every claim is traceable to the resume (`Jerrick_Johnson_Software_Engineer_II_Resume.pdf`) or to Jerrick's GitHub repositories. Nothing invented: no metrics, proficiency levels, testimonials, or unverified features.
- The resume download is a prominent conversion point.
- The mobile experience is designed, not squeezed.

## 2. Content sources and accuracy rules

| Topic | Source |
|---|---|
| Employment, responsibilities, CAT-code project, skills, education | Resume PDF (page 1) |
| Project features, stacks, roles, links | GitHub repos under `github.com/JerrickJohnson` (verified 2026-09-24) |
| Email | `jerrickjohnson88@gmail.com` (confirmed by Jerrick) |
| LinkedIn | `https://www.linkedin.com/in/jerrick-johnson-6bbbba182/` |
| GitHub | `https://github.com/JerrickJohnson` |

Decisions:
- The "React / Apollo Marketplace" **is** the marketplace inside Premier Neighborhood Services (confirmed by Jerrick). It appears as Premier's "My Role", not as a separate project.
- Resume page 2 (non-software roles) is **not** shown on the site. It is available in the PDF.
- Location (Forney, TX) is **not** shown.
- Team projects are labeled as team projects.
- Heroku demos (Premier, Homeward Bound, Tech Blog) return 404 → GitHub links only. Live links are used only for Weather Dashboard and Movie Watchlist (both return 200).

### Verified project facts

- **Premier Neighborhood Services.** A HOA community app for residents: authentication, a neighbor marketplace, HOA-recommended services, community events, messaging with neighbors about marketplace items, and HOA dues payment. Team of 5; Jerrick owns the repo and is the top committer and PR integrator.
  - Stack: React 17, Apollo Client, GraphQL (apollo-server-express), Express, MongoDB/Mongoose, JWT auth (jsonwebtoken + bcrypt), Stripe Checkout, Socket.io, Multer, React Router, Bootstrap.
  - Jerrick's commits: marketplace nav and page; AddProductForm and AddItem page; products linked to the seller user; seller item list with delete; "make offer" on the detail page; link to messages; marketplace and detail styling.
  - Screenshots: 3 README images on GitHub user-attachments.
- **Homeward Bound** (team of 4). A lost/found pet app: sign up and log in, post lost pets with description, location and reward, post found pets and contact owners, shelters post adoptable and adopted pets. Stack: Express, Handlebars, Sequelize, MySQL, bcrypt, express-session, Multer, Sharp. Repo: `JenWariner19/homeward-bound` (fork on Jerrick's account).
- **Movie Watchlist, "Movie Geeks"** (team of 4). Search and discover movies via the TMDB API (search, discover, genre, person, movie detail); Wikipedia API link per movie; a reorderable list (SortableJS) saved in localStorage; Materialize and jQuery. Live: `https://shannonkprice00.github.io/movie-watchlist/`.
- **Weather Dashboard** (solo). OpenWeather current and 5-day forecast APIs, Day.js dates, search history in localStorage. Live: `https://jerrickjohnson.github.io/5-Day-Weather-Forecast/`.
- **The Tech Blog** (solo). CMS-style blog: posts, comments, dashboard, auth. Express, Handlebars, Sequelize, MySQL, bcrypt, sessions.
- **NoSQL Social Network API** (solo). REST API for users, thoughts, reactions and friends. Express, MongoDB/Mongoose.

## 3. Tech approach

- Vite + React 18 + TypeScript (strict), static single page.
- Styling: modern CSS with global design tokens (custom properties) plus one CSS Module per component. No UI or animation libraries.
- Reveals: a small `useInView` hook (IntersectionObserver) plus CSS transitions. All motion is disabled under `prefers-reduced-motion`.
- Fonts: Inter Tight (UI) and JetBrains Mono (labels), from Google Fonts.
- The resume PDF is copied to `public/Jerrick_Johnson_Resume.pdf`.
- Deployable as a static build to GitHub Pages (Vite `base` configurable). Deployment itself is out of scope unless requested.

## 4. Visual identity

- Base: near-black blue-slate (`#0a0d14` range), with subtle alternating section surfaces and hairline borders.
- Accent meaning: **amber** = enterprise / IBM i; **cyan-blue** = modern web; the **amber→cyan gradient** is used only where the two meet (hero convergence node, timeline progress line, primary CTA).
- No neon, matrix, fake terminals, stock photos or illustrations. Code-inspired details are limited to mono section labels (`// 02 — Experience`) and spool/file-style captions.

## 5. Page structure

Nav (sticky; becomes a full-screen menu on mobile): Home · Experience · Engineering · Projects · Resume · Contact.

1. **Hero (`#home`).** Name; "Software Engineer II"; the headline "From enterprise systems to modern applications."; supporting line; CTAs "Explore My Work" (→ #projects) and "View Resume" (PDF); GitHub and LinkedIn links. Right side: the **Convergence visual**.
2. **More Than One Stack (`#about`, EngineeringSnapshot).** The narrative (3 short paragraphs, first person, confident) and three mono fact chips (no metrics).
3. **Professional Experience (`#experience`).** The CRC Group / Wellington Insurance Group role header, Sept 2021 – Present. Work grouped into: Application Development; Reporting; Production Support; Data & Business Rules. A **Texas CAT Code Assignment** highlight card. The **Enterprise Document Processing** subsection: pipeline diagram RPGLE → O-specs / printer files → spooled files → ALP print workflow → printed insured documents; parallel DocPath lane: import forms → edit layouts → add fields → RPGLE data integration.
4. **The Stack Has Changed. The Engineering Hasn't. (`#engineering`, TechEvolution).** A 5-stage vertical timeline (Enterprise Foundation, Business Systems, Modern Development, Modern Data, Today's Workflow). Each stage has a short caption and tags. The progress line fills with the gradient on scroll.
5. **Modern Full-Stack Development.** SMU Full Stack Web Development Certificate, framed as extending the foundation; grouped capabilities.
6. **Selected Work (`#projects`).** Intro line from the brief.
   - `FeaturedProject`: Premier case study (overview, problem, architecture mini-diagram, key features, My Role, stack, team note, GitHub link, screenshots).
   - `ProjectCard` variants: Homeward Bound (wide), Movie Watchlist + Weather Dashboard (pair), Tech Blog + NoSQL API (compact "Additional work").
   - Every project shows **What it is / Built with / Demonstrates**.
7. **Engineering Skills.** Six grouped panels (Enterprise Engineering; Data & Business Systems; Document Processing; Modern Web; Databases; Development Workflow). Text tags only.
8. **Different Technologies. Same Engineering Principles. (Philosophy).** One paragraph and five short principles.
9. **Modern Development Workflow (AIWorkflow).** AI tools for research, learning, debugging, code exploration, problem solving and workflow improvement. Not presented as AI/ML engineering.
10. **Resume CTA (`#resume`).** "Want the full picture?" Download Resume, GitHub, LinkedIn.
11. **Contact (`#contact`).** "Let's Build Something", mailto email, LinkedIn. No form.
12. **Footer.** Name, © year, links, back to top.

## 6. Signature visual — Convergence

- An inline SVG diagram. Left column (amber): IBM i · RPGLE / CL · SQL / DB2 files · Business rules · Spool & print. Right column (cyan): React · Apollo / GraphQL · Node / Express · MongoDB / MySQL · REST APIs.
- Bezier paths from each node converge on a central "Software Engineering" node that carries the gradient ring.
- Slow dash-offset animation along the paths. Hovering or focusing a node highlights its path.
- Mobile (<720px): a separate vertical layout (enterprise row → center node → modern row), not a scaled-down desktop SVG.
- Decorative: `aria-hidden`, with a visually hidden text equivalent.

## 7. Code structure

```
src/
  main.tsx, App.tsx
  styles/ tokens.css, global.css
  data/ site.ts, experience.ts, timeline.ts, projects.ts, skills.ts
  hooks/ useInView.ts, useActiveSection.ts
  components/
    ui/ Section, SectionLabel, Tag, Button, Reveal
    Navigation, Hero, ConvergenceVisual, EngineeringSnapshot, Experience,
    DocumentPipeline, TechEvolution, FullStack, FeaturedProject, ProjectCard,
    Projects, Skills, Philosophy, AIWorkflow, ResumeCTA, Contact, Footer
```

All copy lives in `data/`. Components are presentational.

## 8. Accessibility and performance

- Semantic landmarks, one `h1`, logical heading order, skip link, visible focus rings, and AA contrast for body text.
- The mobile menu has a focus trap and closes on Escape. `aria-current` marks the active nav item.
- Reduced motion disables reveals and the path animation.
- No large JS dependencies. Images are lazy-loaded.

## 9. Verification

- `npm run build` (includes `tsc`) passes with no errors.
- Visual check in the in-app browser at 1440px, 768px and 375px.
- Keyboard walkthrough of nav, menu, CTAs and project links.
- Content audit: every factual statement is checked against §2.

## 10. Out of scope

Contact form or backend, CMS, blog, analytics, custom domain and deployment setup (can follow as separate tasks).
