"use client";

import { useState } from "react";
import { fundTestnetAccount } from "@finessepay/stellar";

interface FriendbotFundingProps {
  accountId: string;
}

export function FriendbotFunding({ accountId }: FriendbotFundingProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onFund() {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const result = await fundTestnetAccount(accountId);
    if (!result.ok) {
      setError(result.error);
    } else {
      setSuccess("Account funded successfully!");
    }
    setLoading(false);
  }

  return (
    <div className="mt-4 rounded-xl border border-line bg-ink-soft p-4">
      <h3 className="text-sm font-medium text-paper">Fund account</h3>
      <p className="mt-1 text-xs text-mist">
        Use Friendbot to add 10,000 XLM to this testnet account.
      </p>
      <button
        onClick={onFund}
        disabled={loading}
        className="mt-3 rounded-lg bg-mint px-4 py-2 text-sm font-medium text-ink hover:bg-mint-bright disabled:opacity-60"
      >
        {loading ? "Funding…" : "Fund with Friendbot"}
      </button>
      {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
      {success && <p className="mt-3 text-xs text-mint">{success}</p>}
    </div>
  );
}
