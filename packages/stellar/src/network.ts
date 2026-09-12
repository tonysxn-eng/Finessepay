import { Networks } from "@stellar/stellar-sdk";

export type StellarNetwork = "testnet" | "public";

export const DEFAULT_HORIZON_URLS: Record<StellarNetwork, string> = {
  testnet: "https://horizon-testnet.stellar.org",
  public: "https://horizon.stellar.org",
};

export const DEFAULT_FRIENDBOT_URL = "https://friendbot.stellar.org";

/**
 * SDF published passphrases. These are public protocol constants, not secrets.
 * @see https://developers.stellar.org/docs/learn/fundamentals/networks
 */
export const NETWORK_PASSPHRASES: Record<StellarNetwork, string> = {
  testnet: Networks.TESTNET,
  public: Networks.PUBLIC,
};

export interface StellarConfig {
  network: StellarNetwork;
  horizonUrl: string;
  networkPassphrase: string;
  friendbotUrl?: string;
}

function readEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

function parseNetwork(value: string | undefined): StellarNetwork {
  if (value === "public" || value === "mainnet") return "public";
  return "testnet";
}

/**
 * Resolve Horizon configuration from environment variables, defaulting to testnet.
 *
 * Recognised env vars:
 * - `STELLAR_NETWORK` (`testnet` | `public`)
 * - `STELLAR_HORIZON_URL`
 * - `STELLAR_NETWORK_PASSPHRASE`
 * - `STELLAR_FRIENDBOT_URL`
 */
export function loadStellarConfig(overrides: Partial<StellarConfig> = {}): StellarConfig {
  const network = overrides.network ?? parseNetwork(readEnv("STELLAR_NETWORK"));
  return {
    network,
    horizonUrl:
      overrides.horizonUrl ??
      readEnv("STELLAR_HORIZON_URL") ??
      DEFAULT_HORIZON_URLS[network],
    networkPassphrase:
      overrides.networkPassphrase ??
      readEnv("STELLAR_NETWORK_PASSPHRASE") ??
      NETWORK_PASSPHRASES[network],
    friendbotUrl:
      overrides.friendbotUrl ??
      readEnv("STELLAR_FRIENDBOT_URL") ??
      (network === "testnet" ? DEFAULT_FRIENDBOT_URL : undefined),
  };
}

export function assertTestnet(config: StellarConfig): void {
  if (config.network !== "testnet") {
    throw new Error(
      `Refusing to proceed: expected testnet, got "${config.network}". FinessePay Stage 0 is testnet-first.`,
    );
  }
}
