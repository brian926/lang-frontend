# AGENTS.md

## Commands

```bash
npm run dev        # Start Vite dev server with HMR (port 5173)
npm run build      # vue-tsc -b (type-check) THEN vite build — fails on type errors
npm run preview    # Serve the production build locally
```

No `lint`, `test`, `format`, or `typecheck` scripts exist. To type-check without building:

```bash
npx vue-tsc -b
```

## Running locally with the backend

The backend (`../lang-tracker`) must run separately on port 8080:

```bash
# In C:\Users\fatim\Code\lang-tracker
go run ./cmd/local
```

Vite proxies `/api` → `http://localhost:8080` (configured in `vite.config.ts`), so no CORS issues during development.

## TypeScript — strict mode gotchas

`tsconfig.app.json` enables `strict: true` plus:
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `erasableSyntaxOnly: true`

Unused variables and parameters are **type errors**, not warnings. The build will fail on them.

`tsconfig.node.json` sets `verbatimModuleSyntax: true` — type-only imports must use `import type`.

## Path alias

`@` resolves to `./src`. Defined in both `vite.config.ts` (Vite) and `tsconfig.app.json` `paths` (TypeScript). Always use `@/` imports instead of relative paths.

## tsconfig structure

Three files with project references:
- `tsconfig.json` — root, references the two below. No `include` here.
- `tsconfig.app.json` — covers `src/**`; has `@/` path alias; extends `@vue/tsconfig/tsconfig.dom.json`
- `tsconfig.node.json` — covers only `vite.config.ts`; requires `@types/node` (installed as devDep)

## Architecture

Single Vue 3 + Vite + Pinia + Vue Router 4 app. Not a monorepo.

- Entry: `src/main.ts` → `App.vue` (always renders `Sidebar` + `Navbar` + `<router-view>`)
- Routes: `/` → `Home.vue` (log form), `/dashboard` → `Dashboard.vue` (stats), `/login` → `Login.vue`
- Stores: `src/store/index.ts` — `useAuthStore` (dormant), `useActivityStore`
- API layer: `src/api/tracker.ts` — typed wrappers around the single `POST /api` backend endpoint
- User identity: `src/constants.ts` exports `USER_ID = 'user1'` (hardcoded until auth is built)

## Backend API contract

Single endpoint: `POST /api` (proxied by Vite; backend runs on `localhost:8080`)

**Log an activity:**
```json
{ "action": "log", "userId": "user1", "language": "Spanish", "activityType": "Watching", "minutes": 60, "date": "2026-04-10" }
```
- `minutes` must be an integer 1–1440
- `date` accepts `YYYY-MM-DD` or `MM/DD/YYYY`

**Fetch stats:**
```json
{ "action": "stats", "userId": "user1", "language": "Spanish" }
```
Returns: `{ totalHours, today, thisWeek, thisMonth, percentages: Record<string, number> }`
- `percentages` is `{}` (empty object, not null) when no logs exist

**Errors** return `{ "error": "..." }` with a non-2xx status.

## Pinia store — `useActivityStore`

- `submitLog(payload)` — calls the API, sets `submitLoading` / `submitError`
- `loadStats(language)` — calls the API, sets `stats` / `statsLoading` / `statsError`
- `lastLanguage` — persists the last used language so Dashboard can auto-load after a log

## Chart

`StatsChart.vue` uses `vue-chartjs` (Doughnut) with `chart.js`. Props: `{ percentages: Record<string, number> }`.
Do **not** re-introduce `recharts` — it is a React library and was removed.

## Tailwind CSS v4

Integrated via `@tailwindcss/vite` plugin — there is no `tailwind.config.js` or `postcss.config.js`. `autoprefixer` and `postcss` are installed as devDeps but are not actively used.

## Routing

`createWebHistory()` (HTML5 mode) is used. Direct URL navigation in production requires the server to return `index.html` for all routes, or users will get 404s.

## Lockfile

`package-lock.json` is listed in `.gitignore` and is not committed. Re-installing dependencies in a fresh clone may resolve to different versions.

## No CI or pre-commit hooks

No `.github/` workflows, no Husky, no lint-staged. Nothing runs automatically on commit or push.
