# 🎯 VSD Maintenance Learning Path

An interactive, Thai-language learning website for **Variable Speed Drive (VSD)** maintenance —
built for new team members and anyone who wants to refresh their knowledge of VSD
(also known as VFD / inverter) operation, configuration, troubleshooting, and preventive maintenance.

> เว็บไซต์บทเรียนภาษาไทยสำหรับการบำรุงรักษาอุปกรณ์ปรับความเร็วรอบมอเตอร์ (VSD)
> ครอบคลุม 30 บทเรียน 7 โมดูล พร้อม Specialist Roadmap 16 ระดับ

## ✨ Features

- **30 lessons across 7 modules** — from "What is a VSD?" to full maintenance procedures
- **Progress tracking** — sign in with Google and your lesson progress syncs across devices (Firebase Realtime Database)
- **🗺️ Specialist Roadmap** ([roadmap.html](roadmap.html)) — a 16-level career path (L0 Foundation → Specialist) with 150+ topics and 48 hands-on milestones; works offline with `localStorage` and syncs to Firebase when signed in
- **🧠 Mindmap view** ([mindmap.html](mindmap.html)) — interactive Mermaid.js mindmaps of the whole learning path
- **No build step** — plain HTML, CSS, and JavaScript; just open and learn

## 📚 Modules

| Module | Topic | Lessons |
|--------|-------|---------|
| 01 | Introduction | 01–05 |
| 02 | AC Motor Fundamentals | 06–10 |
| 03 | Control & Operation | 11–15 |
| 04 | Parameter & Config | 16–20 |
| 05 | Application & Benefits | 21–25 |
| 06 | Troubleshooting & Maintenance | 26–30 |
| 07 | Resource Center | External documents & links |

## 🗂️ Project Structure

```
├── index.html          # Home page: module cards + overall progress bar
├── 01.html … 30.html   # Individual lesson pages
├── roadmap.html        # 16-level specialist roadmap (self-contained JS)
├── mindmap.html        # Mermaid.js mindmap views (self-contained JS)
├── scripts.js          # Progress tracking, navigation, auth UI (lessons + home)
├── style.css           # All styling (shared by every page)
├── firebase-config.js  # Firebase project configuration
└── Resource/           # Reference documents and images (not tracked publicly)
```

## 🚀 Run It Locally

No build tools needed — but Google sign-in requires the page to be served over
`http://` (not opened as a `file://`), so use a tiny local server:

```powershell
# Option 1: Python (if installed)
python -m http.server 8000

# Option 2: VS Code — install the "Live Server" extension and click "Go Live"
```

Then open <http://localhost:8000> in your browser.

> You can browse all lessons without signing in. Signing in with Google is only
> needed to **save** your progress.

## 🔥 Firebase Setup (for your own copy)

This site uses [Firebase](https://firebase.google.com/) for Google sign-in and progress storage.
To run your own instance:

1. Create a project at the [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication → Sign-in method → Google**
3. Create a **Realtime Database**
4. Copy your web app config into `firebase-config.js`
5. **Set the database security rules** so each user can only read/write their own progress:

```json
{
  "rules": {
    ".read": false,
    ".write": false,
    "progress": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "roadmapProgress": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

> **Note:** the Firebase web `apiKey` is a public identifier, not a secret —
> real protection comes from the security rules above and the list of
> **authorized domains** in Authentication settings.

## 🛠️ Tech Stack

- HTML5 / CSS3 / vanilla JavaScript (no framework)
- [Firebase](https://firebase.google.com/) — Authentication (Google) + Realtime Database
- [Mermaid.js](https://mermaid.js.org/) — mindmap rendering

## 📖 Disclaimer

Lesson content is written for internal training purposes. Referenced technical
documents (e.g., ABB technical guides) belong to their respective owners and are
linked rather than redistributed.
