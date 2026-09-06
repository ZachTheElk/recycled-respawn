# Recycled Respawn repository guide

This file applies to all work in this repository. Follow the user's task-specific instructions first, then this guide.

## Project identity and editorial boundaries

Recycled Respawn is an independent, creator-driven publication by ZachTheElk. Its primary editorial pillars are Gaming, Culture, and Features; Gaming is the anchor, not the fence. Coverage may extend into technology, media, internet culture, politics, criticism, essays, and other subjects when there is a genuine perspective.

Published prose attributed to Zach must remain genuinely Zach-authored. Agents may assist with research, structure, editing, critique, formatting, coding, and QA, but must not invent finished Zach-attributed writing or publication history.

## Design philosophy

The internal visual north star is **The Web That Kept Going**: carry the useful density, hierarchy, personality, and exploratory quality of older independent gaming/community sites into a modern publication.

Modern responsiveness, accessibility, semantic HTML, performance, maintainability, readable long-form typography, and strong mobile usability are mandatory. Avoid generic gamer neon/RGB, cyberpunk defaults, sterile SaaS minimalism, excessive whitespace, fake-retro cosplay, and gratuitous CRT or scanline effects. Nostalgia must serve the reading experience rather than impair it.

## Editorial imagery

Permanent editorial imagery and branding must not use AI-generated artwork. Prefer, as appropriate:

- Zach's own captures or screenshots
- Official publisher or developer assets
- Legitimately licensed material
- Intentionally created graphics
- No image when one is unnecessary

AI imagery is acceptable only for private brainstorming or clearly temporary development placeholders. Mark development imagery and placeholder content unmistakably so it cannot be mistaken for publishable material.

## Production safety

**Netlify Auto Publishing is intentionally LOCKED.** Without Zach's explicit approval, never:

- Unlock Auto Publishing
- Publish the development site to the canonical production domain
- Replace the existing production site

Development and review deploys are allowed while production remains locked. Do not casually alter Netlify, Astro, domain, build, or deployment configuration.

Before any push or deployment-dependent work, verify the publishing lock and relevant repository/deploy state. A successful Netlify build labeled “Production” is not proof that it was published to the canonical domain; check the actual production state before reporting it.

## Development workflow and verification

Follow: **Implement → test → inspect → correct → verify again → present**.

Prefer small, controlled changes. Preserve approved modules while working on unrelated areas. Do not perform unrelated cleanup during a focused task, introduce dependencies or abstractions without meaningful immediate benefit, or reconfigure working infrastructure casually. Preserve a stable Git state before risky work.

Never claim browser testing, visual inspection, mobile testing, build testing, or deployment verification unless it actually occurred. Clearly distinguish source-level review from rendered/browser verification. If genuine phone-width rendering is unavailable, state that limitation instead of treating responsive source inspection as a device test.

For code changes, normally verify at least:

- `npm run build`
- The scoped Git diff and working-tree state
- Relevant semantic, accessibility, and responsive behavior
- Rendered desktop/mobile behavior when the available environment supports it
- No regressions to approved modules within the task's scope

When starting a development server, use background mode:

```sh
npm run dev -- --background
```

Manage it with `npm run astro -- dev status`, `npm run astro -- dev logs`, and `npm run astro -- dev stop`.

## Architecture philosophy

This project is maintained by a solo creator. Keep architecture understandable, durable, expandable, and appropriately simple. Generalize only after repeated real patterns demonstrate that an abstraction is useful.

Do not prematurely create universal article, card, or section components. The Featured Story, Newest Column, Gaming, Culture, and Features compositions carry different editorial meanings and should not be flattened into a generic layout. Shared metadata, story fields, headline-link behavior, and image/alt data may become appropriate focused primitives once the content model proves their common contract.

## Current homepage and content direction

The homepage is approved through:

- Featured Story
- Newest Column / Opinion
- Gaming
- Culture
- Features

Major homepage section expansion is paused. Do not assume that another homepage module, right-rail module, or “Implementation 07” should begin automatically. The next likely phase is Content Foundation work using real Zach-authored material.

Prefer Markdown for ordinary editorial content unless a concrete requirement demonstrates a need for MDX. Do not introduce content collections, schemas, article pages, or publishing infrastructure as a side effect of unrelated work.

## Authoring workflow

The authoring experience is a first-class concern. Zach is establishing a Markdown-based workflow in Obsidian, so favor portable files, straightforward frontmatter, understandable preview/publishing steps, and minimal lock-in.

Keep raw editorial notes distinct from finished article drafts. Real editorial samples should increasingly replace development placeholders when they materially improve design or content-model decisions, but do not turn notes into purported finished Zach-authored prose.

## Session resume protocol

External sessions, including Netlify authentication, may expire. When resuming after meaningful inactivity:

1. Verify the repository and working-tree state.
2. Verify the authoritative remote checkpoint.
3. Reconcile any local/remote discrepancy before editing.
4. Reacquire required authentication through the normal supported flow.
5. Verify Auto Publishing remains locked.
6. Verify production and the relevant review/development state when the task depends on them.

Stop and report any material discrepancy before implementation. Do not bypass authentication protections or persist credentials through unsupported methods.

## Change boundaries

Honor the task's explicit scope. Do not refactor code, alter dependencies or configuration, add content architecture, or begin the next implementation unless the user requested it. Preserve unrelated user changes in a dirty worktree and stop for direction if they cannot be safely separated.

Before production launch, perform a deliberate placeholder audit covering:

- Development imagery and starter assets
- Sample content and fake metadata
- Temporary logos and branding
- TODOs and test links
- Development routes
- Other scaffolding or generated placeholders

## Astro references

Use the repository's installed Astro version and existing patterns as the immediate authority. Consult official Astro documentation when a task requires behavior not established locally:

- [Routing](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styling](https://docs.astro.build/en/guides/styling/)
