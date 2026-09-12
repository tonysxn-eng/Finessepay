# FinessePay

Decentralized payments on the **Stellar** network. Receive **XLM / USDC / USDT**, convert to local fiat — **NGN, USD, EUR, JPY**.

Stage 0 is the foundation: a TypeScript monorepo, a Next.js app, a Fastify API, shared Stellar helpers against **testnet Horizon**, and CI that every contributor can rely on.

## Why this exists

Cross-border cash-out is still slow and expensive for a lot of people. Stellar already has the rails (fast settlement, cheap fees, first-class USDCs). FinessePay is the product layer: a wallet-aware app that receives on-chain value and pays out local currency.

We are **testnet-first** until the money path is boring.

## Current status — Stage 0 (Foundations)

| Item | Status |
| --- | --- |
| pnpm monorepo (`apps/*`, `packages/*`) | Done |
| Next.js App Router + TypeScript + Tailwind (`apps/web`) | Done |
| Fastify + TypeScript API (`apps/api`) | Done |
| `@finessepay/stellar` Horizon helpers (testnet) | Done |
| `@finessepay/shared` currencies + API types | Done |
| Root scripts: `dev`, `build`, `lint`, `test`, `typecheck` | Done |
| GitHub Actions CI | Done |
| `.env.example` (no secrets) | Done |
| Vercel / Railway / Fly config | Done (not deployed) |
| Friendbot fund-account UI | Not done — open issue |
| Pubnet / real off-ramps | Out of scope for Stage 0 |

## Architecture

```
┌────────────┐     HTTP      ┌────────────┐     Horizon      ┌─────────────────────┐
│  apps/web  │ ───────────►  │  apps/api  │ ───────────────► │ Stellar testnet     │
│  Next.js   │               │  Fastify   │                  │ horizon-testnet…org │
└────────────┘               └─────┬──────┘                  └─────────────────────┘
                                   │
                    @finessepay/stellar + @finessepay/shared
```

## Repository layout

```
finessepay/
├── apps/
│   ├── web/          # Next.js frontend (Vercel)
│   └── api/          # Fastify API (Railway / Fly)
├── packages/
│   ├── stellar/      # SDK helpers, Horizon, passphrases
│   └── shared/       # Currencies, API routes, Result type
├── .github/workflows/ci.yml
├── .env.example
├── pnpm-workspace.yaml
└── package.json
```

## Quick start

**Requirements:** Node.js 20+ and [pnpm](https://pnpm.io) 9+.

```bash
pnpm install
cp .env.example .env
pnpm dev
```

| App | URL |
| --- | --- |
| Web | http://localhost:3000 |
| API health | http://localhost:3001/health |
| Account lookup | http://localhost:3001/v1/accounts/`G...` |

Look up any **funded testnet** account in the UI at `/lookup`. To fund a new account, use [Friendbot](https://horizon-testnet.stellar.org/friendbot?addr=G...).

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Stellar (testnet)

Defaults live in `packages/stellar` and can be overridden with env vars (see `.env.example`):

| Variable | Stage 0 default |
| --- | --- |
| `STELLAR_NETWORK` | `testnet` |
| `STELLAR_HORIZON_URL` | `https://horizon-testnet.stellar.org` |
| `STELLAR_NETWORK_PASSPHRASE` | `Test SDF Network ; September 2015` |
| `STELLAR_FRIENDBOT_URL` | `https://friendbot.stellar.org` |

Helpers already implemented:

- `loadAccount(accountId)`
- `getBalances(accountId)`
- `getHorizonServer()`
- `fundTestnetAccount(accountId)` (Friendbot)
- Network passphrase constants

## Hosting (prepared, not wired to production)

- **Web → Vercel.** Root directory `apps/web`. See `apps/web/vercel.json`.
- **API → Railway or Fly.io.** Dockerfile at `apps/api/Dockerfile`, plus `apps/api/railway.toml` and `apps/api/fly.toml`.

Set the same env vars as `.env.example` in the host dashboard. Never paste secret keys into the repo.

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md), then pick a [`good first issue`](https://github.com/eischideraa-unn/Finessepay/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

## License

[MIT](./LICENSE) © FinessePay Contributors
