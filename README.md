# Recycled Respawn

Recycled Respawn is a live, independent, creator-driven publication covering games, culture, and features. This repository contains the Astro site and publication-ready content for [recycledrespawn.com](https://recycledrespawn.com).

## Local development

The site uses Astro and requires Node.js 22.12.0 or newer.

```sh
npm install
npm run dev
npm run build
```

Publication-ready Markdown articles live in `src/content/articles/`. Article URLs follow `/{section}/{id}/`, such as `/gaming/example-article/`.

Ordinary builds exclude draft entries at the content-loader boundary so draft-only images never enter the emitted asset graph. Local development and Deploy Previews retain drafts; the existing private-preview allowlist controls which draft routes can be reviewed. Keep article-specific images alongside their Markdown and use the normal `draft` field.

Homepage placement is curated in `src/data/homepage.ts`; Latest, section listings, and RSS derive from published article records.

## Workflow and production safety

Development follows branch → PR → build → Netlify Deploy Preview → review → merge. Production publication remains a separate, explicitly approved manual action.

Netlify Auto Publishing is intentionally **Locked**. Do not unlock it or replace the canonical production site without explicit approval.

See [`AGENTS.md`](AGENTS.md) for detailed project boundaries, operational rules, and verification requirements.
