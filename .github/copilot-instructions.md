<!-- Help for AI coding agents working on ghost-remix-pack-site -->
# Copilot instructions — Ghost Remix Pack

Purpose: Give focused, actionable guidance so an AI can be productive immediately in this repository.

- Big picture
  - Frontend: React + TypeScript + Vite at repository root. Run with `npm run dev` (root package.json).
  - Backend: Node/Express in `/backend` (entry `server.js`). Uses Stripe, Firebase (admin), and SendGrid.
  - Orchestration: `./start-all.sh` launches backend (`cd backend && npm run dev`) and frontend (`npm run dev`). Use that when available.

- How to run locally (most common flows)
  - Full dev (recommended): `./start-all.sh` (starts backend on http://localhost:3001 and frontend on http://localhost:5173).
  - Frontend only: from repo root `npm run dev`.
  - Backend only: `cd backend && npm run dev` (or `npm start` to run production server).
  - Build frontend: `npm run build` (root). Lint: `npm run lint`.
  - Backend quick-check: `cd backend && npm run check` (runs `check-config.js`).

- Environment & secrets
  - Never commit secrets. Use `backend/env.example` as the template. Create `backend/.env` with `cp backend/env.example backend/.env`.
  - Important env names (from `backend/env.example`): STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET, FIREBASE_* (PROJECT_ID, CREDENTIALS), SENDGRID_API_KEY, SENDGRID_FROM_EMAIL.

- Project-specific conventions & patterns
  - Language: primary content and copy are in French — keep UI/copy consistent with existing components.
  - UI: uses shadcn/ui style components and Tailwind; check `tailwind.config.js` and `src/index.css` for theme colors (purple-centered palette).
  - Audio assets: placed under `public/audio/` (samples and packs live there).
  - Stripe flows: frontend calls backend Checkout endpoints; backend routes live in `backend/routes/` (notably `checkout.js` and `webhook.js`). Secure download links are implemented in `backend/routes/download.js`.
  - Dev tooling: nodemon for backend dev; `start-all.sh` uses `npm run dev` for both sides and prints PIDs.

- Key files & places to inspect for typical tasks
  - Root: `package.json`, `vite.config.ts`, `tailwind.config.js`, `src/` (components & App routing).
  - Backend: `backend/server.js`, `backend/routes/`, `backend/services/` (stripe/firebase/email), `backend/env.example`, `backend/INSTALLATION.md` and `backend/README.md`.
  - Automation & diagnostics: `start-all.sh`, `check-installation.sh`, `test-auto.sh`, `railway-diagnostics/` and `test-tout-complet.cjs`.
  - AI task helper docs: `CLAUDE.md` and `/ai-dev-tasks/*` (e.g., `/ai-dev-tasks/create-prd.md`) — reference these when producing scoped PRDs or task lists.

- Concrete examples (copyable)
  - Start both: `./start-all.sh`
  - Start backend only: `cd backend && npm run dev`
  - Create local env (backend): `cp backend/env.example backend/.env` (then fill secrets locally)

- Troubleshooting hints (common repo issues)
  - Missing backend/package.json: many deploy helpers expect `backend/package.json` — ensure it's present and includes `start`/`dev` scripts.
  - Forgetting `.env`: backend will fail — check `backend/env.example` and run `cd backend && npm run check` to see missing vars.
  - Ports: backend default 3001, frontend 5173.

- What AI should produce and avoid
  - Produce: small, well-scoped edits; add tests or a smoke-check when changing API routes; update `backend/env.example` when adding required env names (do not add secrets).
  - Avoid: committing credentials, changing global styles without checking `src/components/ui` and `tailwind.config.js`, or breaking the `start-all.sh` contract.

If anything in these instructions is unclear or you want extra details (example PR template, stricter lint rules, or unit-test examples), tell me which area to expand.
