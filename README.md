# Momants Dashboard

Operator console for **AI messaging agents** used at festivals and events.  
Manage agent training, live conversations (with human takeover), WhatsApp-style templates, broadcast campaigns, QR entry points, and revenue/support analytics.

> **Portfolio note:** This repository is the **Next.js frontend + auth BFF**. Business data and AI runtime live on a separate API (`BASE_API_URL`).

---

## Features

| Area | What it does |
|------|----------------|
| **Auth** | Login with httpOnly cookies; access/refresh token proxy; route protection |
| **Multi-agent** | Switch between AI agents (brand, currency, persona) |
| **Dashboard** | Support cost saved, revenue, AOV, message volume, response time, heatmaps |
| **Training** | Q&A knowledge base, categories, agent name / persona / tone |
| **Conversations** | WhatsApp-like inbox, media & interactive messages, AI vs human takeover, live WebSocket |
| **Templates** | Messaging templates for outbound channels |
| **Campaigns** | Broadcast & trigger campaigns, CSV audiences (WhatsApp / Messenger / SMS) |
| **QR codes** | Prefill chat deep-links with scan tracking |

Tagline in product UI: *Turn conversations into conversions.*

---

## Architecture

```
Browser
  → Next.js App Router (UI)
  → /api/*          auth BFF (login, refresh, logout, access-token)
  → /backend/*      rewrite → external Momants API (BASE_API_URL)
  → WebSocket       realtime chat → NEXT_PUBLIC_BASE_API_URL
```

### Stack

- **Framework:** Next.js (App Router), React 18, TypeScript  
- **Data / state:** TanStack React Query, Zustand  
- **UI:** Tailwind CSS, Radix / shadcn-style components, Recharts  
- **Realtime:** Native WebSockets  
- **Auth pattern:** Cookie-based JWT proxy (httpOnly `access` / `refresh`)

This app does **not** include a database, ORM, or standalone Express/Nest server. Those belong to the platform API this dashboard calls.

---

## Getting started

### Prerequisites

- Node.js 20+
- npm
- Access to a Momants (or compatible) backend API

### Setup

```bash
git clone https://github.com/codemaster8899/momants-dashboard.git
cd momants-dashboard
npm install
cp example.env .env.local
```

Edit `.env.local`:

```env
# Server-side API base (used by Next rewrites + auth routes)
BASE_API_URL=https://your-api.example.com

# Browser-facing API / WebSocket origin
NEXT_PUBLIC_BASE_API_URL=https://your-api.example.com
```

### Run

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

---

## Project structure

```
src/
├── app/
│   ├── api/                 # Auth BFF (login, refresh, logout, access-token)
│   ├── (login)/             # Login page
│   ├── (dashboard)/         # Protected product pages
│   │   ├── dashboard/
│   │   ├── training/
│   │   ├── conversations/
│   │   ├── templates/
│   │   ├── campaigns/
│   │   └── qrcodes/
│   └── mobile/              # Mobile gate
├── components/              # Layout, shared UI
├── hooks/                   # Data fetching + WebSocket
├── stores/                  # Zustand (agent context, UI)
├── lib/api.ts               # Authenticated client → /backend/*
├── proxy.ts                 # Auth guard + token refresh for dashboard routes
└── constants/, types/, utils/
```

---

## Auth flow (BFF)

1. `POST /api/login` → proxies to `{BASE_API_URL}/dashboard/login`, sets httpOnly cookies  
2. Client calls `API('/dashboard/...')` → attaches Bearer token from `/api/access-token`  
3. Next rewrite maps `/backend/*` → `{BASE_API_URL}/*`  
4. On 401, client refreshes via `/api/refresh` and retries  
5. `proxy.ts` protects dashboard routes when the access cookie is missing  

---

## Environment variables

| Variable | Where used | Purpose |
|----------|------------|---------|
| `BASE_API_URL` | Server (`next.config.js`, API routes) | Upstream API for rewrites + auth proxy |
| `NEXT_PUBLIC_BASE_API_URL` | Browser | Public API / WebSocket endpoint |

Never commit real `.env` / `.env.local` files.

---

## License

Private / proprietary unless otherwise stated by the owner.
