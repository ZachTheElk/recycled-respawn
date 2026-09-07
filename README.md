# Recycled Respawn

Recycled Respawn is an independent, creator-driven publication covering games, culture, and features. This repository contains the Astro site and publication-ready content for [recycledrespawn.com](https://recycledrespawn.com).

## Local development

The site uses Astro and requires Node.js 22.12.0 or newer.

```sh
npm install
npm run dev
npm run build
```

Publication-ready Markdown articles live in `src/content/articles/`. Article URLs follow `/{section}/{id}/`, such as `/gaming/example-article/`.

The repository currently includes clearly labeled development fixtures and synthetic homepage records. They are intentional scaffolding for testing layouts, routing, metadata, and the content pipeline; they are not published editorial work and must be replaced or removed before launch.

## Workflow and production safety

Development normally uses a focused branch and pull request, with an Astro production build and Netlify Deploy Preview reviewed before merge.

Netlify Auto Publishing is intentionally **Locked**. Do not unlock it or replace the canonical production site without explicit approval.

See [`AGENTS.md`](AGENTS.md) for detailed project boundaries, operational rules, and verification requirements.
