# Post-publication maintenance audit

Completed after publication of What BioWare Handed Over. Baseline: main `2ca12f2b4b27800072f3fcc12c6ee329674e0342`, canonical Netlify deploy `6ae149b956b4fc180f2bbf7d`. Scope was bounded maintenance, not a redesign or general cleanup.

## Fix now

1. Preserve the draft-package regression in a repository-native `npm run verify:publishing` command. The prior proof lived only in Work-session evidence. The new dependency-free Node helper builds an isolated temporary copy, adds two synthetic drafts with six local images, and compares the complete production artifact to its clean baseline. It also checks preview/dev behavior and public metadata/feed consistency. No loader or authoring/storage changes were needed.
2. Correct active AGENTS guidance that described content foundation as a future phase and content collections as not yet established. Describe the existing Markdown/Astro workflow and retain the explicit scope limits. Replace the obsolete pre-launch audit framing with publication-time checks.
3. Replace the site-update source comment's “launch candidate” wording with “Approved public launch announcement.” The announcement and its historical date remain unchanged.

## Verification

- Final clean `npm run build`: all 108 emitted files match the approved merged publication artifact byte-for-byte. `npm run verify:publishing` passes on the final maintenance changes.

- Production with two draft fixtures is byte-identical to production without them: 108 files, ten published articles. Neither draft route, text, metadata nor six draft-only image files enters output.
- Clean Deploy Preview includes the allowlisted fixture and its three images; the unlisted draft route is absent. Both drafts stay out of homepage/section listings and RSS. Preview sitemap is absent. Draft output has noindex, no social image, no publication-time metadata and no Article JSON-LD.
- An isolated background local dev server serves the allowlisted fixture and its images, returns 404 for the unlisted draft, and excludes both from homepage/Features/RSS. The server is stopped after the check.
- Negative control: removing the loader's draft deletion only in a disposable copy causes the helper to fail at the complete-production-artifact comparison. The test detects the original privacy regression.
- Live rendered inspection covered all 18 HTML pages at 1440px and 320px: 36 views including homepage, all three sections, About, Contact, Editorial Standards, ten articles (including the Review), and custom 404.
- Every rendered page has one primary heading and main landmark; no heading-level jumps, missing image alt attributes, unexpected empty alts, unloaded images or horizontal overflow were found. Decorative logos are intentionally hidden with empty alt. Each page's first Tab reaches a visible skip link; Enter focuses main, and another Tab reaches a content link with a focus outline. Navigation landmarks are named. Representative desktop/mobile screenshots were visually inspected. No obvious readability/contrast defect warranted a styling change. This was a restrained sanity audit, not a full WCAG or assistive-technology certification.

## Metadata findings — no change needed

| Page class | Canonical/indexing | Social/structured data |
| --- | --- | --- |
| Homepage | Canonical root; indexable | Default brand image; matching OG/Twitter large card; WebSite/Organization graph |
| Gaming, Culture, Features | Canonical section path; indexable | Default brand image; website metadata; no unnecessary schema |
| About, Contact, Editorial Standards | Canonical page path; indexable | Default brand image; matching website cards |
| Ordinary articles and Review | Canonical article path; indexable | Hero-derived JPEG; matching cards; Article JSON-LD and publication time |
| Synthetic private draft | Public-intent canonical path; noindex/nofollow | No social image, Article JSON-LD or published timestamp |
| 404 | No canonical; noindex/nofollow; actual HTTP 404 | No social image or JSON-LD; summary card |

Publication dates agree between metadata and Article JSON-LD. Current content has no updatedAt records; the schema rejects updates earlier than publication, and the template forwards updates consistently. Review remains Article schema without a fabricated numeric score. No schema expansion is justified.

## Prepare / record

- Preserve the loader boundary, allowlist distinction, verification command and separate manual-publish boundary in the next checkpoint. No fixed article count belongs in the workflow; ten is only this audit's observation.
- The privacy guarantee depends on keeping article-only images in content and avoiding independent public imports. The helper proves the loader behavior with fixtures; it is not a parser for every possible authoring pattern. Review exceptional asset placement explicitly.
- Protected Deploy Preview can contain assets belonging to unlisted drafts because that context retains the collection. The allowlist controls routes, not asset confidentiality within the protected build. Production is the complete-package boundary.
- A curated article changed back to draft causes the current production curation lookup to fail closed, rather than silently replacing a homepage slot. This is safe; deliberate unpublication/curation changes should be reviewed together.
- Continue rendered review and live Netlify lock/authentication checks. A repository script cannot certify platform access controls or that a deploy was manually published.

## No action

- Loader, route gating and public collection filters are coherent. No redesign or new abstraction needed.
- No active seven/nine-article assumptions, test routes, TODO/FIXME tasks, fake metadata or emitted development placeholders were found. Existing optional development banners and image fallbacks are dormant; removing them would be unrelated cleanup. The empty private-preview allowlist remains necessary infrastructure.
- Provisional design-token commentary is a design decision for Control Room, not permission to restyle the site. Existing visual modules, curation, prose, review policy, dates and source notes remain intact.
- No demonstrated reliability problem warrants dependency upgrades, a testing framework, CI configuration changes, Netlify changes or broad refactoring.

Production must remain on the baseline deploy with Auto Publishing Locked. This maintenance branch is for draft-PR review only; do not merge or publish without approval.
