# preferences feature

Current state: `src/stores/user-preferences-store.ts` (Zustand) covers local goal/diet
selection — no server sync yet, no importers wired in yet either.

Add here once preferences need to sync with a backend:

- `hooks/` — TanStack Query hooks to fetch/persist preferences server-side
- `services/` — API client calls, response schemas (Zod)

Keep the Zustand store as the client-side source of truth; use Query hooks only
for the server round-trip, don't duplicate server state into the store.
