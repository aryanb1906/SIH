<div align="center">
   <img src="public/placeholder-logo.png" alt="FarmGrow" height="82" />
   <h1>FarmGrow – Gamified Sustainable Farming Platform</h1>
   <p><strong>Empowering farmers with sustainable practices through missions, community, rewards, quizzes, and AI assistance.</strong></p>
   <p>
      <a href="#overview">Overview</a> •
      <a href="#features">Features</a> •
      <a href="#architecture">Architecture</a> •
      <a href="#getting-started">Getting Started</a> •
      <a href="#environment-variables">Env Vars</a> •
      <a href="#troubleshooting">Troubleshooting</a> •
      <a href="#roadmap">Roadmap</a>
   </p>
</div>

---

## Overview
FarmGrow motivates farmers to adopt sustainable, climate‑smart practices through structured missions, quizzes, community interaction, and an AI agronomy assistant. The current build is an MVP optimized for rapid iteration, accessibility, and extensibility.

## <a id="features"></a>Core Features

| Area | Description |
|------|-------------|
| Missions | Start / progress / complete sustainable practice challenges; local persistence and recommendations. |
| Dashboard | Track points, streak potential, progress, and reward metrics. |
| Rewards | View and (future) redeem reward items; mock persistence. |
| Community | Placeholder hub for future threaded discussions. |
| Blog | Create, list, view, and locally persist posts with tags & filters. |
| Quiz | Timed multi‑question quiz with levels, badges, sounds, share & leaderboard views. |
| Leaderboard | Local (device) ranking of quiz scores including level & badges summary. |
| AI Chat | Gemini‑powered plain‑text assistant (no markdown parsing) via `/api/chat`. |
| Feedback | Local feedback capture (`localStorage`) for feature / bug tracking. |
| Weather & Calculator | Crop profit calculator + city weather lookup. |
| Auth | Google OAuth (NextAuth) + demo sign-in placeholder. |

---

## <a id="architecture"></a>Architecture

Logical layers:
1. UI (Next.js App Router + Tailwind CSS + Radix primitives + custom design system)
2. Auth (NextAuth.js session + OAuth provider)
3. AI (Gemini API wrapper route `app/api/chat/route.ts`)
4. Domain modules (missions, rewards, quiz, blog, support)
5. State & Utilities (Zustand + helpers in `lib/` & custom hooks)
6. Static Assets & Styling (`public/`, `styles/`)

```
app/
   api/
      chat/route.ts          # Gemini proxy
   blog/                    # Blog pages
   calculator/              # Crop profit calculator
   community/               # Community hub (placeholder)
   dashboard/               # User dashboard
   leaderboard/             # Quiz leaderboard
   missions/                # Missions listing
   quiz/                    # Quiz flows + subpages
   rewards/                 # Rewards center
   support/                 # Full AI chat page
   signin/                  # Auth
components/
   ai-chat-widget.tsx
   feedback-form.tsx
   mission-card.tsx
   rewards-dashboard.tsx
   ui/                      # Reusable primitives
hooks/
lib/
public/
styles/
```

### AI Chat Flow
1. User input (widget or `/support`).
2. POST to `/api/chat` with `{ message }`.
3. Route calls Gemini with safety prompt.
4. Response returned as plain text.
5. UI appends message (no markdown rendering to reduce injection surface).

### Data & Persistence (MVP)
All state is local (memory or `localStorage`). Future plan: Postgres + Prisma or Supabase with server actions.

### Feedback & Leaderboard Storage
Stored under keys: `feedbackItems`, `quizScores` in `localStorage`.

---

## <a id="getting-started"></a>Getting Started

1. Clone: `git clone git@github.com:aryanb1906/SIH.git` & `cd SIH`
2. Copy `.env.example` → `.env.local`
3. Fill in the required environment variables
4. Install dependencies:
    - `npm install` (default)
    - or `pnpm install` (if you use pnpm)
5. Start dev server: `npm run dev`
6. Visit `http://localhost:3000`

### Scripts
```
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Run production build
npm run lint    # Lint codebase
```

---

## <a id="environment-variables"></a>Environment Variables

Create `.env.local` (not committed). Reference template in `.env.example`.

Required:
```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GEMINI_API_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
OPENWEATHER_API_KEY=
```

Optional (Email auth):
```
EMAIL_SERVER=
EMAIL_FROM=
```

Generate a secure secret (cross‑platform suggestion):
Node: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

Gemini key: https://makersuite.google.com/app/apikey

---

## <a id="troubleshooting"></a>Troubleshooting
| Issue | Cause | Fix |
|-------|-------|-----|
| AI Chat 400 / invalid key | Missing / bad `GEMINI_API_KEY` | Add valid key & restart server |
| Google OAuth callback error | Redirect URI mismatch | Add `http://localhost:3000/api/auth/callback/google` to console |
| Email provider not showing | Missing both email vars | Set `EMAIL_SERVER`, `EMAIL_FROM` |
| PowerShell script restrictions | Execution policy blocks pnpm | Use CMD or run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| Full reload instead of Fast Refresh | Large structural change or error | Check terminal warnings & fix component boundaries |

---

## Security Notes
No secrets are committed. AI route limits output formatting to reduce prompt injection risk. Add rate limiting & server validation once persistence is introduced.

---

## Roadmap
| Phase | Goal | Highlights |
|-------|------|------------|
| 1 | MVP Polish | Auth, static missions, AI chat, quiz & rewards baseline |
| 2 | Persistence Layer | Postgres + Prisma / Supabase, mission & quiz storage |
| 3 | Community Expansion | Threads, replies, moderation, rich media |
| 4 | Advanced AI | Multi‑turn memory, context enrichment, agronomy advisories |
| 5 | PWA & Offline | Install prompt, offline mission progress, cache strategy |
| 6 | Marketplace | Partner reward catalog, redemption workflows |
| 7 | Analytics & Impact | Track sustainable practice adoption metrics |

---

## Contributing
1. Fork & branch
2. Install dependencies & configure `.env.local`
3. `npm run dev`
4. Follow component + accessibility conventions
5. PR with context + screenshots / before–after if UI

### Quality Backlog
ESLint stricter config, unit tests (Vitest / Jest), accessibility audit, story-based component docs, i18n scaffolding.

---

## License
Currently unlicensed (default: all rights reserved). Add an OSS license (MIT / Apache-2.0) if external contributions are desired.

---

Thanks for supporting sustainable agriculture! 🌱
