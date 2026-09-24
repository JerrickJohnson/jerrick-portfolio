# Jerrick Johnson — Portfolio

Personal portfolio of Jerrick Johnson, Software Engineer II: enterprise software on IBM i
(RPGLE, CL/CLLE, SQL, document and print processing) extended into modern full-stack
development.

**Live site:** https://jerrickjohnson.github.io/jerrick-portfolio/

## How it was built

I built this site with [Claude Code](https://claude.com/claude-code) as an AI pair
programmer. I wrote the brief, supplied and checked every fact against my resume and
repositories, and approved each stage. The process is recorded in this repository:

1. **Design spec:** [`docs/superpowers/specs/`](docs/superpowers/specs/)
2. **Implementation plan:** [`docs/superpowers/plans/`](docs/superpowers/plans/)
3. **Test-driven implementation:** each commit adds tests alongside the code (`npm test`)
4. **Independent code review** of the whole branch, with the findings fixed test-first
5. **Browser verification** at desktop and phone widths

Commits made with Claude are marked `Co-Authored-By: Claude`.

## Stack

React 18, TypeScript (strict), Vite, CSS Modules, Vitest + Testing Library. No UI or
animation libraries. All copy lives in `src/data/`, so content changes don't touch
components.

## Run it

```
npm install
npm run dev      # http://localhost:5173
npm test         # unit and component tests
npm run build    # production build in dist/
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which tests, builds with the
repository name as the base path, and publishes to GitHub Pages.
