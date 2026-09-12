import { StrKey } from "@stellar/stellar-sdk";
import type { AccountBalance } from "@finessepay/shared";
import { err, ok, type Result } from "@finessepay/shared";
import { getHorizonServer } from "./horizon.js";
import { loadStellarConfig, type StellarConfig } from "./network.js";

export class InvalidAccountIdError extends Error {
  constructor(accountId: string) {
    super(`Invalid Stellar account id: ${accountId}`);
    this.name = "InvalidAccountIdError";
  }
}

export function isValidAccountId(accountId: string): boolean {
  return StrKey.isValidEd25519PublicKey(accountId);
}

export function assertValidAccountId(accountId: string): void {
  if (!isValidAccountId(accountId)) {
    throw new InvalidAccountIdError(accountId);
  }
}

interface HorizonBalanceLine {
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
  balance: string;
  buying_liabilities?: string;
  selling_liabilities?: string;
}

/** Map a Horizon balance line into the shared AccountBalance shape. */
export function mapBalance(line: HorizonBalanceLine): AccountBalance {
  const isNative = line.asset_type === "native";
  return {
    asset: isNative ? "XLM" : (line.asset_code ?? line.asset_type),
    assetType: line.asset_type,
    issuer: isNative ? undefined : line.asset_issuer,
    balance: line.balance,
    buyingLiabilities: line.buying_liabilities,
    sellingLiabilities: line.selling_liabilities,
  };
}

export interface LoadedAccount {
  accountId: string;
  network: string;
  sequence: string;
  subentryCount: number;
  balances: AccountBalance[];
}

/**
 * Load a Stellar account from Horizon.
 * Returns a Result so callers can handle 404 (account not funded) without try/catch.
 */
export async function loadAccount(
  accountId: string,
  config: StellarConfig = loadStellarConfig(),
): Promise<Result<LoadedAccount, string>> {
  if (!isValidAccountId(accountId)) {
    return err(`Invalid Stellar account id: ${accountId}`);
  }

  try {
    const server = getHorizonServer(config);
    const account = await server.loadAccount(accountId);
    return ok({
      accountId: account.accountId(),
      network: config.network,
      sequence: account.sequence,
      subentryCount: account.subentry_count,
      balances: account.balances.map((line) => mapBalance(line as HorizonBalanceLine)),
    });
  } catch (error) {
    return err(formatHorizonError(error, accountId));
  }
}

/** Convenience wrapper around {@link loadAccount} that returns only balances. */
export async function getBalances(
  accountId: string,
  config: StellarConfig = loadStellarConfig(),
): Promise<Result<AccountBalance[], string>> {
  const result = await loadAccount(accountId, config);
  return result.ok ? ok(result.value.balances) : result;
}

function formatHorizonError(error: unknown, accountId: string): string {
  if (isNotFound(error)) {
    return `Account ${accountId} was not found on Horizon. On testnet, fund it with Friendbot first.`;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Unknown Horizon error";
}

function isNotFound(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const maybe = error as { response?: { status?: number }; status?: number };
  return maybe.response?.status === 404 || maybe.status === 404;
}
