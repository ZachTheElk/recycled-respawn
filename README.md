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

## Publishing regression check

After installing dependencies, run `npm run verify:publishing` before reviewing publishing/content-loader changes or an article publication pass. It uses Node and the installed Astro only; no test framework or browser dependency is required.

The check creates a disposable copy in the system temporary directory, links the existing dependencies, and runs clean production and Deploy Preview builds plus a managed background local dev server. It never edits real articles, changes the real allowlist, or replaces the working checkout's `dist` directory. Temporary fixtures and output are removed when it finishes normally; an interrupted process may leave an `rr-publishing-*` temporary directory/server to stop and remove.

Two synthetic drafts (one allowlisted, one unlisted), each with a hero and two inline local SVG images, exercise the privacy boundary. Every production artifact must match the clean pre-fixture baseline byte-for-byte. Preview/dev must render the allowlisted draft with images and noindex protections, exclude the unlisted draft route, and keep both out of public listings and RSS. Deploy Preview must have no sitemap. Preview is a protected build context, not an asset-access boundary between allowlisted and unlisted drafts: retained content can contribute assets there.

The same command checks public-page canonical/social metadata and Article JSON-LD consistency, social-image existence, primary headings/main landmarks, and RSS/sitemap membership against emitted article records. Counts follow current content, not a fixed launch total. It fails with a nonzero exit code.

This is a regression check, not publication approval or a comprehensive content-security scanner. Keep draft-only images beside their Markdown; files placed in `public/` or imported independently by public code are outside the loader boundary. Review real draft routes/assets and any unusual imports during intake. Continue to compare the approved artifact, inspect rendered prose/images and responsive behavior, verify external preview protection and the Netlify lock, and stop at the established review/manual-publish boundaries. Those steps are not replaced by this command.
