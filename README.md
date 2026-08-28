# Steve Aby Tonio — Engineering Portfolio & Cyber-Architect HUD

[![Live Portfolio](https://img.shields.io/badge/Live-steveaby.github.io%2FPersonal__Website-00f3ff?style=for-the-badge&logo=github&logoColor=black)](https://steveaby.github.io/Personal_Website/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![UIUC MS CS](https://img.shields.io/badge/UIUC-Master's%20in%20CS-blue?style=for-the-badge&logo=illinois&logoColor=white)](https://illinois.edu/)

A high-performance personal portfolio engine and cyber-architect HUD built with **Vanilla HTML5, CSS3, and JavaScript**. Designed with an Awwwards-inspired dark aesthetic, glassmorphic HUD telemetry, real-time particle canvas physics, Web Audio synthesizer effects, an interactive terminal, standalone case studies, a dedicated certifications matrix, and a 2021 college archive.

---

## ⚡ Core Features

### 🖥️ Interactive Telemetry & UX
* **Interactive Terminal Pro**: Full-featured in-browser terminal supporting commands (`help`, `resume`, `projects`, `certs`, `skills`, `bio`, `team`, `clear`) with `Tab` autocompletion and `↑`/`↓` command history buffers.
* **Command Palette (`⌘K` / `Ctrl+K`)**: Fast keyboard-driven command hub for instant section jumping, project launches, and document downloads.
* **Web Audio Synthesizer**: Procedurally generated audio feedback using the HTML5 Web Audio API for UI clicks, terminal keystrokes, and mode toggles.
* **Interactive Image Lightbox**: Fullscreen high-resolution modal with blur backdrop and keyboard arrow navigation (`←`/`→`/`Esc`) for all project diagrams and certificates.
* **1-Click Cyber Toast**: Copy contact comms and repo links to clipboard with instant animated HUD notifications.
* **Dual-Mode Resume Viewer**: In-browser PDF viewport supporting instant toggle between **1-Page Condensed** and **Full Comprehensive** resumes with direct download actions.

---

## 🚀 Standalone Project Case Studies

Each flagship project features its own deep-dive case study page with architectural diagrams, technology radars, system benchmarks, and engineering breakdowns:

| Project | Domain / Highlights | Tech Stack | Case Study |
| :--- | :--- | :--- | :--- |
| **SidelineSight** | Live WebSockets & Intent-Adaptive Sports Analytics | React 19, TypeScript, Vite, Tailwind CSS, Python FastAPI, WebSockets | [`projects/sidelinesight.html`](projects/sidelinesight.html) |
| **BugCatcher Joey** | Distributed Monte Carlo Tree Search (MCTS) Pokémon AI | React 19, Python FastAPI, Node.js (`@smogon/calc`), Modal Cloud, MCTS | [`projects/bugcatcherjoey.html`](projects/bugcatcherjoey.html) |
| **ReServe** | Campus Food Sustainability & Surplus Marketplace | React 19, Node.js (ESM), Express 5, MongoDB Atlas, Mongoose 8, Cron TTL | [`projects/reserve.html`](projects/reserve.html) |
| **IlliniRide** | Relational Database ACID Transaction Rideshare Engine | MySQL 8.0 (Stored Procedures & Triggers), Node.js, Raw SQL, Vanilla JS | [`projects/illiniride.html`](projects/illiniride.html) |
| **HyperSafety** | Real-Time PyTorch Lightning CNN & 128D Face Recognition | PyTorch Lightning, Python 3.9, OpenCV DNN, Dlib, Flutter, Node.js, MySQL | [`projects/hypersafety.html`](projects/hypersafety.html) |
| **VectorQuest** | Springer Nature Published AI Question Answering Research | Python, PyTorch, Hugging Face Transformers, Vector DBs, Semantic Search | [`projects/vectorquest.html`](projects/vectorquest.html) |

---

## 📜 Certifications & Credentials Matrix

A dedicated, filterable credentials portal ([`certifications.html`](certifications.html)) featuring 9 verified certifications with instant fullscreen Lightbox inspection and PDF views:

* **Salesforce Agentforce Specialist** — Certification ID: `5754768`
* **Salesforce Certified AI Associate** — Certification ID: `5624840`
* **Salesforce Marketing Cloud Email Specialist** — Certification ID: `5501094`
* **Oracle Academy Database Foundations** — Relational Database Modeling & SQL
* **NPTEL / IIT Python** — The Joy of Computing using Python
* **LinkedIn Learning** — Foundations of Business Banking
* **LinkedIn Learning** — Financial Basics Everyone Should Know
* **LinkedIn Learning** — Business Etiquette for Modern Workplace
* **LinkedIn Learning** — Business Etiquette: Phone, Email, Text

---

## 🕰️ Ace Neutrino Archive (2021)

An authentic replica of the original **2021 Ace Neutrino college portfolio** ([`aceneutrino.html`](aceneutrino.html) & [`aceneutrino/`](aceneutrino/)), featuring the original Gatsby styling, team member profiles (Akul Jain, Harsh Ambasta, Ritvik Sharma, Steve Aby Tonio, Vivek Nichani), and HyperSafety project history, unified under a modern sticky Cyber HUD archive banner.

---

## 📁 Repository Structure

```tree
Personal_Website/
├── index.html                  # Main portfolio homepage & HUD telemetry
├── certifications.html         # Dedicated 9-certificate credentials matrix
├── aceneutrino.html            # Ace Neutrino (2021) team archive
├── style.css                   # Core cyber design system, tokens, and animations
├── script.js                   # Client runtime (terminal, audio, lightbox, modals)
├── README.md                   # Repository documentation
├── projects/                   # Dedicated standalone case studies
│   ├── sidelinesight.html
│   ├── bugcatcherjoey.html
│   ├── reserve.html
│   ├── illiniride.html
│   ├── hypersafety.html
│   └── vectorquest.html
├── assets/                     # Optimized visual assets & media
│   ├── aceneutrino/            # Team photos & archive badges
│   ├── bugcatcher/             # Joey AI simulation screenshots
│   ├── certifications/         # High-res certificate previews & PDFs
│   ├── hypersafety/            # Neural network diagrams & stream GIFs
│   ├── illiniride/             # Relational database app screenshots
│   ├── logos/                  # Company & university emblems
│   ├── reserve/                # Marketplace flow UI screenshots
│   ├── resume/                 # Verified 1-Page & Full PDF resumes
│   ├── sidelinesight/          # Sports telemetry screenshots
│   └── vectorquest/            # Research paper diagrams
└── aceneutrino/                # Standalone 2021 Gatsby production assets
```

---

## 🛠️ Local Development

Clone the repository and spin up a lightweight local HTTP server:

```bash
# 1. Clone the repository
git clone https://github.com/steveaby/Personal_Website.git
cd Personal_Website

# 2. Start a local server (Python 3)
python3 -m http.server 8080

# 3. Open in your browser
open http://localhost:8080
```

*Alternatively, using Node.js:*
```bash
npx serve .
```

---

## 🌐 Deployment

The website is fully static and optimized for zero-configuration hosting on **GitHub Pages**, **Vercel**, or **Netlify**:

* **GitHub Pages URL**: [https://steveaby.github.io/Personal_Website/](https://steveaby.github.io/Personal_Website/)
* OpenGraph and Twitter Card metadata are baked into every page for rich link previews across LinkedIn, X/Twitter, and Discord.

---

## 👤 Author

**Steve Aby Tonio**
* **Education**: Master's in Computer Science @ University of Illinois Urbana-Champaign (UIUC)
* **Email**: [stonio2@illinois.edu](mailto:stonio2@illinois.edu) / [steveaby@gmail.com](mailto:steveaby@gmail.com)
* **LinkedIn**: [linkedin.com/in/steveaby](https://www.linkedin.com/in/steveaby/)
* **GitHub**: [github.com/steveaby](https://github.com/steveaby)
* **Portfolio**: [steveaby.github.io/Personal_Website](https://steveaby.github.io/Personal_Website/)
