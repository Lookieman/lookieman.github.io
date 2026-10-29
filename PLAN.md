# Revamp plan

Branch: `revamp`. `main` stays unchanged until the owner approves a merge.

## Files read

`_config.yml`, `.gitignore`, `README.md`, `index.md`, `sap-projects.md`, `ai-projects.md`, `.revamp/brief.md`.

## Decisions where the brief needs interpretation

1. **Publishing check uses whole-word matching.** The brief lists `SIA `, `Lion `, `NUS`, `SPC`, `PSD`, `PMO` as case-insensitive terms. As raw substrings, `SIA ` matches "Asia " (in the required "Now" box), `Lion ` matches "million ", and `NUS` matches "bonus". The script matches short acronyms as whole words and longer names as phrases. This keeps the intent and avoids false failures.
2. **Method pages get their own collection, `_methods`.** The case-study template (Context, Problem, ...) does not fit a method. A separate collection keeps the rule "every collection item uses this template" true for `_enterprise_ai`, `_builds` and `_research`. Method pages publish under `/enterprise-ai/methods/<slug>/`.
3. **Engagement cards and internal accelerators live in `_data/engagements.yml`.** They are short cards, not case studies, so they do not need a collection file.
4. **The "Applied AI practice" entry in `sap-projects.md` moves to the Enterprise AI page**, not to Data management. It is AI practice work. Lines that break the publishing rules are removed: the defence and security deck, the 106-requirement response, and the two-week build for "a consumer electronics manufacturer" (now covered by an engagement card).
5. **Articles with `url: TODO` do not render.** A `url` counts only when it starts with `http`. The Writing page and the Home section show a short "first articles coming soon" note until real URLs exist.
6. **Statuses for completed internal or academic work.** The status list has no "Complete" value. Internal accelerators, the PII framework and the research items use `Prototype`. Each is flagged as a TODO to confirm.
7. **KaKi-Talkie repo** returned HTTP 200 on 2026-10-29, so the link is included.
8. **Diagrams.** Collection items carry a small Mermaid diagram in front matter (`diagram:`) for the card image, plus a full diagram in the Architecture section. Engagement and data management cards are text-only, because they are not case studies.
9. **Build tooling.** Homebrew is not writable on this machine and system Ruby is 2.6. The build uses a `Gemfile` with the `github-pages` gem, installed into `vendor/bundle`.

## Phase 1: Plan

- Add `PLAN.md`.

## Phase 2: Foundation

- `_config.yml`: remove `theme`; add `jekyll-seo-tag`, `jekyll-redirect-from`, `jekyll-sitemap`; define collections `enterprise_ai`, `methods`, `builds`, `research` with permalinks; add author, social links, positioning line; exclude `PLAN.md`, `scripts`, `vendor`, `Gemfile*`, `README.md`.
- `Gemfile`, `.gitignore` (add `_site`, `.jekyll-cache`, `vendor`, `.bundle`).
- `_layouts/default.html`: two-column shell, theme bootstrap script in `<head>`, Google Fonts, SEO tag.
- `_layouts/page.html`, `_layouts/case-study.html`, `_layouts/method.html`.
- `_includes/sidebar.html` (name, positioning line, page nav with in-page section links, social links, CV, theme toggle), `_includes/card.html`, `_includes/status-badge.html`, `_includes/section-heading.html`, `_includes/mermaid.html`.
- `assets/css/site.css`: one stylesheet, light and dark tokens, status badge colours, layout, cards, filters.
- `assets/js/site.js`: theme toggle with `localStorage`, mobile menu, scroll-highlight navigation, Mermaid render and re-render on theme change, card filters.
- Placeholder pages for every route so the navigation resolves, with `redirect_from` on `/data-management/` (from `/sap-projects`, `/sap-projects.html`) and `/builds/` (from `/ai-projects`, `/ai-projects.html`).
- `scripts/check_publishing.sh`.

## Phase 3: Content migration

- `_data/sap_projects.yml`: every project from `sap-projects.md` except the Applied AI practice entry. Fields: title, descriptor, country, domain, role, team_size, users, summary, bullets. No project cost lines.
- `data-management.md`: cards with country and domain filter buttons.
- `_enterprise_ai/pii-anonymisation-evaluation.md`: full case study, entity count removed, TODO comment.
- `_research/pathogen-extraction-sfa.md`: NTU capstone, micro-F1 0.52 to 0.65 only, TODO to reconcile stage F1 figures.
- `_research/structure-from-motion.md`: shortened from `ai-projects.md`.
- `about.md`: bio, education, certifications, CV button with TODO.
- `index.md`: hero, three numbers, Now box, featured case studies.
- Remove `sap-projects.md` and `ai-projects.md` (their URLs now redirect).

## Phase 4: New content

- `_methods/`: four method pages (five questions; code calculates, AI explains, a person decides; value before build; plan to hypercare).
- `_data/engagements.yml`: six engagement cards and two internal accelerators (SOW draft generator, RAG evaluation framework).
- `enterprise-ai.md`: methods, practice summary, engagement cards, case studies.
- `_builds/agentdq.md`, `_builds/kaki-talkie.md`: full case studies.
- `_data/articles.yml`, `writing.md` grouped by series, Home "latest articles".

## Phase 5: Checks

- `bundle exec jekyll build`.
- `scripts/check_publishing.sh`.
- `htmlproofer` if it installs cleanly (ignore the CV file until it exists).
- Review at 375 px and 1440 px widths, and contrast check of the colour tokens in both modes.

## Phase 6: Report

- Summary, TODO list, preview command.

## Phase 5 results (2026-10-29)

- `bundle exec jekyll build`: no errors.
- `scripts/check_publishing.sh`: passes. Tested against planted terms first.
- `htmlproofer`: did not install cleanly (nokogiri binary mismatch on system Ruby 2.6), so it was skipped. A scripted internal link and anchor check found one missing target: `/assets/cv/Luqman_Ali_CV.pdf` (owner TODO).
- Contrast: all text and badge colours pass WCAG AA on every background in both modes (lowest 5.5:1 light, 7.0:1 dark).
- 375 px and 1440 px review in light and dark mode: no horizontal scroll. Filters, menu, theme toggle and redirects tested.
