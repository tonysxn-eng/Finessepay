import Link from "next/link";
import { CURRENCIES, FIAT_CURRENCIES, STELLAR_ASSETS } from "@finessepay/shared";

const STAGE_STATUS = [
  { stage: "Stage 0", label: "Foundations", state: "in progress" },
  { stage: "Stage 1", label: "Wallets & SEP-10", state: "planned" },
  { stage: "Stage 2", label: "On/off-ramp", state: "planned" },
  { stage: "Stage 3", label: "Local payouts", state: "planned" },
] as const;

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 10% -10%, #d4a01722, transparent), radial-gradient(ellipse 50% 40% at 90% 10%, #7dcea022, transparent)",
        }}
      />

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="font-[family-name:var(--font-display)] text-xl tracking-tight text-paper">
          FinessePay
        </Link>
        <nav className="flex items-center gap-6 text-sm text-mist">
          <Link href="/lookup" className="hover:text-gold-bright">
            Testnet lookup
          </Link>
          <a
            href="https://github.com/eischideraa-unn/Finessepay"
            className="hover:text-gold-bright"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </nav>
      </header>

      <main className="relative mx-auto max-w-6xl px-6 pb-24 pt-10">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-ink-soft px-3 py-1 text-xs uppercase tracking-[0.18em] text-mint">
          Stellar testnet · Stage 0
        </p>
        <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[1.05] text-paper sm:text-6xl">
          Receive crypto.
          <br />
          Pay out local cash.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
          FinessePay is an open-source payment app on the Stellar network. Users receive{" "}
          <strong className="font-medium text-paper">XLM, USDC, or USDT</strong> and convert to{" "}
          <strong className="font-medium text-paper">NGN, USD, EUR, or JPY</strong>.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/lookup"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-ink hover:bg-gold-bright"
          >
            Look up a testnet account
          </Link>
          <a
            href="https://github.com/eischideraa-unn/Finessepay/blob/main/CONTRIBUTING.md"
            className="rounded-full border border-line px-5 py-2.5 text-sm text-paper hover:border-gold"
            rel="noreferrer"
            target="_blank"
          >
            Contribute
          </a>
        </div>

        <section className="mt-16 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-ink-soft p-6">
            <h2 className="text-sm uppercase tracking-[0.16em] text-gold">On-chain in</h2>
            <ul className="mt-4 space-y-2">
              {STELLAR_ASSETS.map((code) => (
                <li key={code} className="flex justify-between text-paper">
                  <span>{CURRENCIES[code].name}</span>
                  <span className="font-[family-name:var(--font-mono)] text-mist">{code}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-ink-soft p-6">
            <h2 className="text-sm uppercase tracking-[0.16em] text-mint">Local fiat out</h2>
            <ul className="mt-4 space-y-2">
              {FIAT_CURRENCIES.map((code) => (
                <li key={code} className="flex justify-between text-paper">
                  <span>{CURRENCIES[code].name}</span>
                  <span className="font-[family-name:var(--font-mono)] text-mist">
                    {CURRENCIES[code].symbol} {code}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-paper">Roadmap</h2>
          <ol className="mt-6 divide-y divide-line rounded-2xl border border-line bg-ink-soft">
            {STAGE_STATUS.map((item) => (
              <li key={item.stage} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-[family-name:var(--font-mono)] text-xs text-gold">{item.stage}</p>
                  <p className="text-paper">{item.label}</p>
                </div>
                <span className="text-sm capitalize text-mist">{item.state}</span>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
