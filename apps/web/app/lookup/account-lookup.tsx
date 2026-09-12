"use client";

import { useState, type FormEvent } from "react";
import type { AccountResponse } from "@finessepay/shared";
import { API_ROUTES } from "@finessepay/shared";
import { FriendbotFunding } from "./friendbot-funding";

interface AccountLookupProps {
  apiUrl: string;
}

export function AccountLookup({ apiUrl }: AccountLookupProps) {
  const [accountId, setAccountId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<AccountResponse | null>(null);
  const [lookupError, setLookupError] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setAccount(null);
    setLookupError(false);

    try {
      const response = await fetch(`${apiUrl}${API_ROUTES.account(accountId.trim())}`);
      const body = (await response.json()) as AccountResponse & { error?: string };
      if (!response.ok) {
        setLookupError(true);
        throw new Error(body.error ?? `Request failed (${response.status})`);
      }
      setAccount(body);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lookup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          required
          name="accountId"
          spellCheck={false}
          placeholder="G..."
          value={accountId}
          onChange={(event) => setAccountId(event.target.value)}
          className="flex-1 rounded-xl border border-line bg-ink-soft px-4 py-3 font-[family-name:var(--font-mono)] text-sm text-paper outline-none placeholder:text-line focus:border-gold"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-gold px-5 py-3 text-sm font-medium text-ink hover:bg-gold-bright disabled:opacity-60"
        >
          {loading ? "Looking up…" : "Look up"}
        </button>
      </form>

      {error ? (
        <div className="mt-6 rounded-xl border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          <p>{error}</p>
          {lookupError && <FriendbotFunding accountId={accountId.trim()} />}
        </div>
      ) : null}

      {account ? (
        <div className="mt-8 rounded-2xl border border-line bg-ink-soft p-6">
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-gold">
            {account.network}
          </p>
          <p className="mt-2 break-all font-[family-name:var(--font-mono)] text-sm text-paper">
            {account.accountId}
          </p>
          <p className="mt-2 text-sm text-mist">Sequence {account.sequence}</p>
          <table className="mt-6 w-full text-left text-sm">
            <thead className="text-mist">
              <tr>
                <th className="pb-2 font-medium">Asset</th>
                <th className="pb-2 font-medium">Balance</th>
                <th className="pb-2 font-medium">Issuer</th>
              </tr>
            </thead>
            <tbody>
              {account.balances.map((line) => (
                <tr key={`${line.asset}-${line.issuer ?? "native"}`} className="border-t border-line">
                  <td className="py-2 text-paper">{line.asset}</td>
                  <td className="py-2 font-[family-name:var(--font-mono)] text-mint">{line.balance}</td>
                  <td className="py-2 font-[family-name:var(--font-mono)] text-xs text-mist">
                    {line.issuer ?? "native"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
