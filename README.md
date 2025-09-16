# Wikipedia Graph Explorer (Frontend)

Vite + React + TypeScript frontend with feature-sliced architecture, configurable API base URL, React Query, Zustand, Axios + Zod, Tailwind UI, and an API Explorer page.

## Quick start (Windows PowerShell)

1. Create `.env` from example and adjust values.
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start dev server:
   ```powershell
   npm run dev
   ```

Open `http://localhost:5173`.

## Runtime configuration

- Base URL default from `VITE_API_BASE_URL` (env). Visible selector in toolbar.
- Override via URL query: `?api=http://127.0.0.1:8000` (also persisted to `localStorage`).
- Health check hits `/openapi.json` or `/docs`.

## Environment variables (.env)

```
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_DEFAULT_LANG=en
VITE_MAX_RENDER_NODES=1500
```

## Scripts

- `npm run dev` – start Vite dev server
- `npm run build` – type-check and build
- `npm run preview` – preview production build
- `npm run test` – run Vitest

## Architecture (feature-sliced)

- `src/app` – providers (Config, Query)
- `src/entities` – types
- `src/services` – API interfaces, Axios implementation, Zod schemas, React Query hooks
- `src/store` – Zustand store for graph state
- `src/widgets` – UI widgets (Toolbar, GraphCanvas, NodePanel)
- `src/features` – features like search box
- `src/pages` – Home, Explorer, Explorations, ApiExplorer
- `src/shared` – UI elements, utils, mocks
- `src/processes` – cross-cutting processes (toasts)

## Screenshots

Place screenshots of Explorer and API Explorer here.

