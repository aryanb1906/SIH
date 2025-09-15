<div align="center">
   <img src="public/placeholder-logo.png" alt="FarmGrow" height="82" />
  
   <h1>FarmGrow – Gamified Sustainable Farming Platform</h1>
   <p><strong>Empowering farmers with sustainable practices through missions, community, rewards, and AI assistance.</strong></p>
   <p>
      <a href="#architecture">Architecture</a> •
      <a href="#tech-stack">Tech Stack</a> •
      <a href="#getting-started">Getting Started</a> •
      <a href="#ai-chat-flow">AI Chat</a> •
      <a href="#design-system">Design System</a> •
      <a href="#roadmap">Roadmap</a>
   </p>
</div>

---

## Overview
FarmGrow motivates farmers to adopt eco-friendly agricultural techniques via structured learning missions, a progress & rewards layer, a collaborative community, and an AI-powered agronomy assistant. Built with performance, accessibility, and extensibility in mind.

## Core Features

| Area | Description |
|------|-------------|
| Missions | Interactive, goal‑oriented sustainable practice challenges with start/progress/complete actions, search/filter, recommendations, and persistent progress tracking. |
| Dashboard | Tracks points, progress, achievements, and impact metrics. |
| Community | Space for knowledge sharing (future: threads, comments). |
| Rewards | Earn and redeem points for inputs, training, certifications. |
| AI Support | Context‑aware Gemini assistant for agronomy queries. |
| Authentication | Google OAuth (email provider optional). |
| Gamification | Badges, XP, streaks (extensible). |

---

## Architecture

High‑level logical layers:

1. UI Layer (Next.js App Router + Tailwind + Radix primitives)
2. Auth Layer (NextAuth.js – session + OAuth providers)
3. AI Layer (Gemini API – routed through `/api/chat`)
4. Domain Modules (missions, rewards, community, support)
5. Design System (reusable UI components under `components/ui` + layout primitives)
6. Utilities (helper functions in `lib/` – can expand later)

```
app/
   page.tsx                # Landing + navigation
   dashboard/              # Auth-gated dashboard
   missions/               # Missions listing (static placeholder)
   rewards/                # Rewards center
   community/              # Community hub (future expansion)
   support/                # Full AI chat interface
   signin/                 # Auth sign-in page
   api/
      auth/[...nextauth]/   # NextAuth route handler
      chat/route.ts         # Gemini proxy endpoint
components/
   ai-chat-widget.tsx      # Floating quick-access AI widget
   mission-card.tsx        # Presentational mission card
   rewards-dashboard.tsx   # Rewards summary module
   session-header.tsx      # Session-aware header (login/logout)
   container.tsx           # Layout width & horizontal padding control
   ui/                     # Design system primitives (button, card, etc.)
hooks/                    # Reusable stateful logic
lib/                      # Utilities (e.g., `utils.ts`)
public/                   # Static assets
styles/                   # Global stylesheet & Tailwind layers
```

### Data Flow (Current MVP)
Data is mock/static. Future persistence (PostgreSQL + Prisma or Supabase) can integrate via server actions or API routes.

### Auth Flow
1. User clicks `Sign In` → `/api/auth/signin` (Google)
2. Google OAuth → callback → session cookie
3. Protected routes (e.g., `/dashboard`) guard via session check
4. `SessionHeader` reflects login state & sign-out

### <a id="ai-chat-flow"></a>AI Chat Flow
1. User submits question (widget or `/support`)
2. Frontend POST → `/api/chat` `{ message, context }`
3. System prompt constrains output (farming only, plain text)
4. Gemini returns answer → JSON `{ message }`
5. UI renders plain text (no markdown parsing)

---

## <a id="getting-started"></a>Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env.local`
3. Fill in required environment variables (see below)
4. Install dependencies:
   - Using **npm** (default): `npm install`
   - (Optional) Using **pnpm** (if installed & execution policy allows): `pnpm install`
5. Run the development server: `npm run dev` (or `pnpm dev`)
6. Open `http://localhost:3000`

### Environment Variables

Auth & AI features require keys/secrets. Minimal required for basic login + chat:

```
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
GEMINI_API_KEY=your-gemini-api-key
NEXTAUTH_SECRET=generate-a-random-secret
NEXTAUTH_URL=http://localhost:3000
```

Generate `NEXTAUTH_SECRET` (on mac/linux) with: `openssl rand -base64 32`  
On Windows (PowerShell): `[Convert]::ToBase64String((New-Object Byte[] 32 | % { (Get-Random -Maximum 256) }))`

Optional (enable email sign-in):
```
EMAIL_SERVER=smtp://user:pass@smtp.example.com:587
EMAIL_FROM=FarmGrow <no-reply@example.com>
```

### Obtaining a Gemini API Key
Visit Google AI Studio: https://makersuite.google.com/app/apikey and create a key, then set `GEMINI_API_KEY`.

### Using pnpm (Optional)
If you prefer `pnpm` but PowerShell blocks scripts, open a **Command Prompt** and run:
```
cmd /c pnpm install
cmd /c pnpm dev
```

### Scripts
```
npm run dev     # Start dev server
npm run build   # Production build
npm start       # Start prod server (after build)
npm run lint    # Lint (currently disabled during build in config)
```

### Troubleshooting
| Issue | Fix |
|-------|-----|
| `AI Chat Error: Failed to get AI response` | Ensure `GEMINI_API_KEY` is valid and restart dev server. |
| Google sign-in loop / 400 error | Confirm `GOOGLE_CLIENT_ID/SECRET` and that Authorized redirect URI includes `http://localhost:3000/api/auth/callback/google`. |
| Email login not showing | Add both `EMAIL_SERVER` and `EMAIL_FROM` to `.env.local` and restart. |
| PowerShell cannot run npm/pnpm (`running scripts is disabled`) | Use Command Prompt or change execution policy: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`. |
| 404 on `/api/auth/*` | Ensure the `[...nextauth]` folder and `route.ts` exist (they do by default). |

### Deployment Notes
- Set all required env vars in your hosting provider (e.g., Vercel project settings).
- If using Email provider, configure production SMTP and verified sending domain.
- `images.unoptimized` is enabled in `next.config.mjs` for simpler hosting; remove for production optimization.

### Security

# FarmGrow – SIH MVP

Empowering farmers with sustainable practices through missions, community, rewards, and AI assistance.

## 🚀 Features

- **Missions**: Interactive sustainable farming challenges (start, progress, complete, recommendations, search/filter, persistent progress)
- **Dashboard**: Track points, achievements, and progress
- **Community**: Share knowledge and connect with other farmers
- **Rewards**: Earn and redeem points for inputs, training, and certificates
- **AI Support**: Gemini-powered assistant for farming queries (chatbot and widget)
- **Authentication**: Google OAuth and demo sign-in
- **Blog System**: Write, view, and persist blog posts
- **Crop Profit Calculator**: Calculate profits, ROI, and margins for different crops
- **Weather Forecast**: Get live weather data for any city
- **Navigation**: Consistent Back button and modern UI across all pages

## 🛠️ Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS & Radix UI
- Zustand (state management)
- Google Gemini API (AI assistant)
- Lucide React (icons)

## 📂 Key Files & Structure

```
app/
  page.tsx           # Landing page
  dashboard/         # User dashboard
  missions/          # Missions listing
  rewards/           # Rewards center
  community/         # Community hub
  blog/              # Blog system (index & posts)
  calculator/        # Crop profit calculator
  weather/           # Weather forecast
  support/           # Full AI chat interface
  signin/            # Sign-in page
  api/
    chat/route.ts    # Gemini AI proxy endpoint
components/
  ai-chat-widget.tsx # Floating AI widget
  ...                # UI components, cards, nav, etc.
public/              # Static assets
styles/              # Global styles
lib/, hooks/         # Utilities & custom hooks
```

## 📝 How to Run & Push Code

1. Initialize git: `git init`
2. Add files: `git add .`
3. Commit: `git commit -m "SIH MVP: new features, fixes, UI updates"`
4. Add remote: `git remote add origin <your-repo-url>`
5. Push: `git push -u origin main`

## 🌟 Recent Improvements

- Interactive Missions: start, progress, complete missions; progress bar and points; recommendations and search/filter; persistent state in `localStorage`.
- Crop Profit Calculator: advanced options & ROI calculations.
- Weather Forecast: live city-based weather with improved UI.
- Blog System Enhancements:
   - Persistent posts (demo seed + user created)
   - Write / Edit / Delete workflow with validation
   - View counting (increments when opening a post)
   - Like button on list cards (local state & persistence)
   - Tag & Category filter chips + search bar (title/excerpt/tags)
   - Inline "Write Blog" button always visible
- Single Global Navbar: removed old duplicate secondary bar for cleaner layout.
- Quiz Landing Screen: added interactive start screen before questions (foundation for progress persistence & leaderboard sync).
- Demo sign-in flow and persistent demo user.
- Consistent Back button navigation on all pages.
- Modernized UI and improved accessibility.
- Fixed build errors and improved client/server component handling.
- Integrated Google Gemini API for AI chatbot.

### ⏳ In Progress / Upcoming
- Quiz persistent progress (store level, XP, badges in `localStorage`).
- Leaderboard sync with real-time quiz progress.
- Mission progress fine-grained updates (partial progress adjustments).
- Structured backend persistence (planned: Postgres + Prisma or Supabase).

## ⚡ Environment Variables

- `GEMINI_API_KEY` – Google Gemini AI key
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` – Google OAuth
- `NEXTAUTH_SECRET` – Session encryption
- `NEXTAUTH_URL` – Base URL
- `OPENWEATHER_API_KEY` – Weather API key

## 💡 Troubleshooting

## Roadmap

| Phase | Goal | Highlights |

## 🤝 Contributing

Fork, branch, commit, and open a PR! Follow design and code conventions for UI and accessibility.

---
Happy farming and sustainable growing! 🌱
|-------|------|------------|
| 1 | MVP polish | Auth, static missions, AI chat, mock rewards |
| 2 | Persistence | Database integration (Prisma + Postgres) |
| 3 | Community | Threads, replies, moderation tools |
| 4 | Advanced AI | Multi-turn context, cropping plans |
| 5 | Mobile PWA | Offline support, install prompts |
| 6 | Marketplace | Partner reward catalog |

---

## Contributing

1. Fork & branch
2. Install deps & configure env
3. `npm run dev`
4. Follow design + code conventions
5. Open PR with description & screenshots

### Planned Quality Enhancements
Pending tasks: ESLint setup, spacing normalization, accessibility sweep, `cn` helper extraction, test harness.

---



Thanks for supporting sustainable agriculture! 🌱
