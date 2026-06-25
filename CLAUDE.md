@AGENTS.md

# Link Tracker

A minimal link bookmarking app. Users paste a URL, give it a label, and see a running list of saved links.

## Stack

- Next.js 16.2.9 — App Router, Server Components, Server Actions (`use server`)
- React 19
- Tailwind CSS 4
- No database — links are stored in a module-level in-memory array on the server (resets on restart)

## Running

```bash
npm run dev   # starts on http://localhost:3000 (default port)
```

## Architecture

- `app/page.tsx` — main page (Server Component); renders the add-link form and the saved links list
- `app/actions.ts` — Server Actions (`'use server'`); `addLink` appends to the in-memory store, `getLinks` reads from it
- `app/store.ts` — module-level mutable array that acts as the in-memory store
- Interactive form lives in a `'use client'` component so it can handle state and submission feedback

## Data shape

```ts
type Link = {
  id: string
  url: string
  label: string
  createdAt: string // ISO timestamp
}
```

## Key conventions

- Mutations go through Server Actions, not API routes
- Client Components use `'use client'` at the top and are imported into Server Components
- Tailwind 4 — no `tailwind.config.js`; configuration lives in `globals.css` via `@theme`
- Port 3000 is the default; no config change needed
