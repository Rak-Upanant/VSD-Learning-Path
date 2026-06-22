# Lesson ↔ Roadmap Linking — Design Spec

Date: 2026-06-22
Status: Approved (Approach A, navigation-only, both add-ons included)

## Goal

Make the 30 lessons and the 16-level Specialist Roadmap feel like **one connected
system** by adding bidirectional navigation links. NO coupling of the two Firebase
progress trees (`progress/$uid` vs `roadmapProgress/$uid`) — this is purely navigation.

## Hard constraints

- **`roadmap.html` must NOT load `scripts.js`.** It has its own auth code; loading
  scripts.js would register a second `onAuthStateChanged` listener (the exact bug we
  fixed in Phase 2). Therefore the lesson data the roadmap needs must be duplicated
  locally inside `roadmap.html`.
- Keep the existing XSS-safe pattern: build injected DOM with `createElement` +
  `textContent`, never `innerHTML` with dynamic strings.
- Match the existing site style (CSS variables in `style.css`, Sarabun font, blue
  `--primary-color: #0056b3`). Beginner-friendly, commented code.

## The mapping (lesson → roadmap level)

| Lessons | Level |
|---|---|
| 01,02,03,04,05,11,12,13,14,15 | L1 — Drive System Basics |
| 06,07,08,09,10,21,22,23,24,25 | L2 — Motor & Load Knowledge |
| 16,17,18,19,20 | L3 — Single Drive System |
| 26,28,29 | L9 — Troubleshooting |
| 30 | L10 — Preventive & Predictive Maintenance |
| 27 | L13 — Tools & Test Equipment |

Module → level (for home-page card tags): M01→L1, M02→L2, M03→L1, M04→L3,
M05→L2, M06→L9, M07 (Resource Center) → none.

## Implementation

### 1. `scripts.js`
- Add `level: 'L1'` (etc., per mapping) to each object in `lessons[]`.
  `resource-01` gets no level.
- Add a lookup so a lesson page can show its level's title without loading roadmap data:
  ```js
  const ROADMAP_LEVELS = {
    L1: 'Drive System Basics',
    L2: 'Motor & Load Knowledge',
    L3: 'Single Drive System',
    L9: 'Troubleshooting',
    L10: 'Preventive & Predictive Maintenance',
    L13: 'Tools & Test Equipment'
  };
  ```
- In the lesson-page init (where the footer is built), inject a **roadmap badge**
  right after the lesson's first `<h2>`:
  text `🗺️ ส่วนหนึ่งของ Roadmap · {level} — {title}`, as an `<a>` linking to
  `roadmap.html#{level}`. Class `lesson-roadmap-badge`. Build with createElement +
  textContent. Skip if the current lesson has no `level`.

### 2. `roadmap.html`
- Add `lessons: [{f:'01.html', n:'01', t:'What is VSD'}, ...]` to the L1, L2, L3, L9,
  L10, L13 objects in `ROADMAP[]` (titles from `lessons[]` in scripts.js).
- In the level-render function, when `level.lessons` exists, render a
  "📘 บทเรียนที่เกี่ยวข้อง" row of chips; each chip is an `<a href="{f}">` showing
  `{n} · {t}`. Class `roadmap-related-lessons` / `roadmap-lesson-chip`.
- Give each rendered level element `id="{level.id}"` (e.g. `id="L1"`) so `#L1` works.
- On load, if `location.hash` matches a level id, scroll it into view and expand it
  (remove `.collapsed`). Also handle the user arriving via the lesson badge.

### 3. `index.html`
- Add a small tag in each module-header linking to its level, e.g.
  `<a class="module-roadmap-tag" href="roadmap.html#L1">🗺️ L1</a>`. Module 07 gets none.

### 4. `style.css`
- `.lesson-roadmap-badge` — inline-flex blue pill (use `--secondary-color` bg tint),
  rounded, hover state, sits below the lesson title with margin.
- `.roadmap-related-lessons` + `.roadmap-lesson-chip` — chip row, wraps, small chips.
- `.module-roadmap-tag` — small pill in the module header.
- **Responsive images** (add-on, supports the image work):
  ```css
  .vsd-learning-path img { max-width: 100%; height: auto; }
  .vsd-learning-path figure { margin: 20px 0; text-align: center; }
  .vsd-learning-path figcaption { font-size: 0.9em; color: var(--dark-gray-color); margin-top: 8px; }
  ```

### 5. Milestone count fix (add-on b)
- `roadmap.html` welcome text "48 Milestones" → "49 Milestones".
- `index.html` roadmap-banner "48 Milestones" → "49 Milestones".

## Verification (must do before claiming done)
Use the preview server (`python -m http.server`, port 8000) + preview tools:
1. No console errors on index, a lesson, roadmap.
2. Lesson page shows the badge; clicking it opens `roadmap.html#L1` and scrolls/expands L1.
3. Roadmap L1 shows related-lesson chips; a chip opens the lesson.
4. Home module cards show the `→ Lx` tag.
5. Milestone counter and labels both read 49.
6. Check mobile (375px) — no horizontal overflow, chips wrap.
```
