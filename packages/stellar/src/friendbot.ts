import { err, ok, type Result } from "@finessepay/shared";
import { isValidAccountId } from "./account.js";
import { loadStellarConfig, type StellarConfig } from "./network.js";

export interface FriendbotResult {
  accountId: string;
  hash?: string;
}

/**
 * Fund a testnet account via Friendbot. Refuses to run against pubnet.
 */
export async function fundTestnetAccount(
  accountId: string,
  config: StellarConfig = loadStellarConfig(),
): Promise<Result<FriendbotResult, string>> {
  if (config.network !== "testnet") {
    return err("Friendbot is only available on testnet.");
  }
  if (!config.friendbotUrl) {
    return err("No Friendbot URL configured.");
  }
  if (!isValidAccountId(accountId)) {
    return err(`Invalid Stellar account id: ${accountId}`);
  }

  try {
    const url = new URL(config.friendbotUrl);
    url.searchParams.set("addr", accountId);
    const response = await fetch(url);
    const body = (await response.json()) as { hash?: string; detail?: string; title?: string };

    if (!response.ok) {
      return err(body.detail ?? body.title ?? `Friendbot failed with HTTP ${response.status}`);
    }

    return ok({ accountId, hash: body.hash });
  } catch (error) {
    return err(error instanceof Error ? error.message : "Friendbot request failed");
  }
}
