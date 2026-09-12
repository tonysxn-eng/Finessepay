import type { Metadata } from "next";
import Link from "next/link";
import { AccountLookup } from "./account-lookup";

export const metadata: Metadata = {
  title: "Testnet account lookup",
};

export default function LookupPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-6 py-10">
      <Link href="/" className="text-sm text-mist hover:text-gold-bright">
        ← FinessePay
      </Link>
      <h1 className="mt-8 font-[family-name:var(--font-display)] text-4xl text-paper">
        Testnet account lookup
      </h1>
      <p className="mt-3 text-mist">
        Reads public account data from Stellar Horizon via the FinessePay API. No keys
        are collected. Default network: testnet.
      </p>
      <AccountLookup apiUrl={apiUrl} />
    </div>
  );
}
