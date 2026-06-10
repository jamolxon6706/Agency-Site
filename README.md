# Axis Labs Agency Website

Trust-first, bilingual (Uzbek/Russian) multi-page agency website built with Next.js.

## Features

- Multi-page structure: home, services, service detail, work, case studies, process, about, contact, thank-you, privacy, terms
- Bilingual routing: `/uz/*` and `/ru/*`
- Conversion-first lead form with:
  - `POST /api/leads`
  - Zod validation
  - Honeypot anti-spam field
  - IP-based rate limiting
  - Duplicate submission guard
- Lead persistence in `data/leads.ndjson`
- Optional notifications:
  - Webhook (`LEAD_INBOX_WEBHOOK_URL`)
  - Telegram (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`)
- SEO baseline:
  - Per-page metadata and OpenGraph
  - `sitemap.ts`
  - `robots.ts`
- Accessibility and motion safety:
  - semantic structure
  - focus styles
  - `prefers-reduced-motion` support

## Tech Stack

- Next.js (App Router)
- TypeScript
- Framer Motion
- Zod
- Vitest

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Available vars:

- `NEXT_PUBLIC_SITE_URL`
- `LEAD_INBOX_EMAIL`
- `LEAD_INBOX_WEBHOOK_URL`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run type-check`
- `npm run test`

## Lead Payload Contract

`POST /api/leads`

```json
{
  "name": "",
  "company": "",
  "role": "",
  "phone_or_telegram": "",
  "email": "",
  "service_interest": ["custom-crm"],
  "budget_range": "3k-7k",
  "timeline": "1-2-months",
  "project_summary": "",
  "preferred_language": "uz",
  "consent": true,
  "website": ""
}
```

`website` is a hidden honeypot field and must remain empty.

