# Quiz per Module — Design Spec

Date: 2026-06-22
Status: Approved direction (records score in Firebase, no gating; questions drafted in quizzes.js)

## Goal
A multiple-choice quiz for each of Modules 01–06. Records the user's score in Firebase
(per user), shows result + per-question feedback. Does NOT gate anything.

## Data (already drafted)
`quizzes.js` defines `const QUIZZES = { 'module-01': [ {q, choices[4], answer, explain}, ... ], ... }`
(6 questions per module, 01–06; module-07 has none).

## Components
### `quiz.html` (new, reusable, one page for all modules)
- Loads (in order): firebase app/auth/database compat 9.22.1, `firebase-config.js`,
  `auth.js`, `quizzes.js`, then inline quiz logic.
- Reads module id from URL: `quiz.html?m=module-01`. If missing/invalid → friendly message + link home.
- Renders the module name + each question as a card: question text + 4 radio choices.
- "ตรวจคำตอบ" (submit) button → compute score (count correct), percent = round(correct/total*100).
- Result panel: score `X/total` + percent; then per-question review showing the user's pick,
  the correct choice, and the `explain` text (correct = green, wrong = red).
- "ทำแบบทดสอบใหม่" (retake) resets; link back to home.
- Auth UI via `auth.js` (`#auth-container`) — do NOT redefine renderAuthUI or add a second
  renderAuthUI listener. quiz.html must NOT load scripts.js.

### Firebase
- Save on submit IF logged in: `quizScores/$uid/$moduleId = { score, total, percent, at: <Date.now()> }`.
- On load, read `quizScores/$uid/$moduleId` and show the previous best/last score.
- Logged out: show the result but display a "เข้าสู่ระบบเพื่อบันทึกคะแนน" note (matches lesson behaviour).
- The quiz page may register its OWN `onAuthStateChanged` to load the saved score (separate purpose,
  one registration — fine; this does not conflict with auth.js's UI listener).

### `scripts.js` — home integration
- In `renderModuleCards()`, add a "📝 ทำแบบทดสอบ" link/button to each module card 01–06
  (NOT module-07), pointing to `quiz.html?m=<moduleId>`.
- When logged in, read `quizScores/$uid` once and annotate each module's button with the saved `%`.

### `style.css`
- Quiz question cards, choice rows (radio), selected/correct/incorrect states, result panel,
  retake button — all in the existing "Instrument Panel" look (ink + amber, IBM Plex fonts, mono for scores).
- Module-card quiz button styling.

### README + security
- Add the Firebase Realtime DB rule for `quizScores/$uid` (same per-user pattern as `progress`):
  `"quizScores": { "$uid": { ".read": "$uid === auth.uid", ".write": "$uid === auth.uid" } }`.

## Verify (mandatory)
Preview (port 8000): quiz.html?m=module-01 renders 6 questions; selecting answers + submit
shows correct score and per-question feedback; logged-out shows the login-to-save note (no errors);
module cards 01–06 show the quiz button; no console errors; mobile 375px OK.
