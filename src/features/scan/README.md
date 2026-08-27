# scan feature

Placeholder. `src/app/scan/*.tsx` currently hold pure mock state (no real backend call).

Once photo-scan hits a real API, move business logic here:

- `hooks/` — TanStack Query hooks (`useScanMutation`, `useConfirmFoods`)
- `services/` — API client calls, response schemas (Zod)
- `components/` — presentational pieces extracted from `src/app/scan/*.tsx`

Keep `src/app/scan/*.tsx` as thin route wiring per Expo Router convention.
