# Contributing to FinessePay

FinessePay is built in the open. This document is the shortest path from “I found the repo” to a merged pull request.

## Code of the road

- **TypeScript everywhere.**
- **Testnet first.** Do not point helpers, CI, or examples at Stellar pubnet unless an issue explicitly asks for it.
- **No secrets in git.** Use `.env` locally. Copy from `.env.example`.
- **One issue → one PR** when you can. Small diffs review faster.

## Pick up work

1. Browse [open issues](https://github.com/eischideraa-unn/Finessepay/issues).
2. Prefer labels:
   - `good first issue` — scoped, documented, safe for a first PR
   - `help wanted` — we want this, and it is not fully specified
   - `stage-0` — foundations (monorepo, CI, Horizon helpers)
   - `frontend` / `backend` / `stellar` / `ci`
3. Comment on the issue: `I'd like to take this` so nobody doubles up.
4. Wait for a maintainer to assign it when you can. If it has been idle for a few days, you may start and mention that in the issue.

## Local setup

Prerequisites: **Node.js 20+** and **pnpm 9+**.

```bash
git clone https://github.com/eischideraa-unn/Finessepay.git
cd Finessepay
pnpm install
cp .env.example .env
pnpm dev
```

- Web: http://localhost:3000  
- API: http://localhost:3001/health  

Useful scripts (from the repo root):

| Script | What it does |
| --- | --- |
| `pnpm dev` | Shared packages in watch + web + API |
| `pnpm lint` | ESLint across workspaces |
| `pnpm typecheck` | `tsc --noEmit` across workspaces |
| `pnpm test` | Vitest |
| `pnpm build` | Production build of packages and apps |

## Branch and PR

```bash
git checkout -b issue-12-fund-testnet-account
# ...make the change...
pnpm lint && pnpm typecheck && pnpm test && pnpm build
git push -u origin issue-12-fund-testnet-account
```

Then open a pull request against `main` using the template. Link the issue with `Fixes #12`.

### Review bar

A PR should:

- Pass GitHub Actions (install, lint, typecheck, test, build)
- Include tests when you change behaviour in `packages/*` or `apps/api`
- Avoid drive-by refactors
- Keep Horizon URLs and passphrases configurable (see `packages/stellar`)

## Where things live

```
apps/web          Next.js App Router UI
apps/api          Fastify HTTP API
packages/stellar  Horizon client, account + balance helpers
packages/shared   Currencies, API route constants, Result type
```

If you are new to Stellar, start with `packages/stellar/src/account.ts` and the [Horizon overview](https://developers.stellar.org/docs/data/horizon).

## Security

Do not file public issues for key material, payout credentials, or anything that could move funds. Email the maintainers or use GitHub’s private advisory flow.

## License

By contributing you agree that your work is licensed under the [MIT License](./LICENSE).
