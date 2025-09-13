# FarmGrow - Gamified Sustainable Farming Platform

A comprehensive platform that motivates farmers to adopt sustainable agricultural practices through interactive learning, community engagement, and real rewards.

## Features

- **Interactive Learning Missions**: Complete challenges like "Mulching Challenge" and "Bio-Pesticide Switch"
- **Progress Dashboard**: Track sustainability scores, achievements, and farming impact
- **Community Features**: Connect with local farmers, share progress, and participate in leaderboards
- **Rewards System**: Earn points redeemable for farming supplies, training, and certifications
- **AI Doubt Support**: Get instant answers to farming questions using Gemini AI

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env.local`
3. Fill in required environment variables (see below)
4. Install dependencies:
   - Using **npm** (default): `npm install`
   - (Optional) Using **pnpm** (if installed & execution policy allows): `pnpm install`
5. Run the development server: `npm run dev` (or `pnpm dev`)
6. Open `http://localhost:3000`

### Required Environment Variables

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

### Getting a Gemini API Key
Visit Google AI Studio: https://makersuite.google.com/app/apikey and create a key, then set `GEMINI_API_KEY`.

### Running with pnpm (Optional)
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
- Never commit `.env.local`.
- Rotate keys if accidentally exposed.
- Use least-privilege OAuth scopes (default Google profile scopes are minimal).

---
Happy farming and sustainable growing! 🌱

## AI Doubt Support

The platform includes an AI-powered doubt support system that helps farmers get instant answers to their questions about:

- Sustainable farming techniques
- Pest and disease management
- Water conservation methods
- Crop selection and planning
- Government schemes and subsidies
- Modern farming technology

The AI assistant is accessible through:
- Dedicated `/support` page with full chat interface
- Floating chat widget available on all pages
- Quick question buttons for common farming queries

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI**: Tailwind CSS with Radix UI components
- **AI**: Google Gemini API for intelligent farming assistance
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics

## Environment Variables (Summary)

- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: Google OAuth login
- `GEMINI_API_KEY`: Required for AI doubt support feature
- `NEXTAUTH_SECRET`: Session/JWT encryption secret
- `NEXTAUTH_URL`: Base URL (important for emails / callbacks)
- `EMAIL_SERVER`, `EMAIL_FROM`: Optional email sign-in
