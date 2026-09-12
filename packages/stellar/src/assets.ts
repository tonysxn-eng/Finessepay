import { Asset } from "@stellar/stellar-sdk";
import type { StellarAsset } from "@finessepay/shared";

/**
 * Well-known testnet issuers. These are public addresses, not secrets.
 *
 * Circle's USDC issuer is the same on testnet and pubnet.
 * USDT on Stellar testnet is less standardized — override via env if needed.
 *
 * @see https://developers.stellar.org/docs/tokens/how-to-issue-an-asset
 */
export const DEFAULT_TESTNET_ISSUERS = {
  USDC: "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5",
  // Placeholder: confirm the active testnet USDT issuer before using in production flows.
  USDT: "GCQTGZQQ5G4PTM2GL7CDIFKUBIPEC52BROAQIAPW53XBRCBM4QKMS5K6",
} as const;

function readIssuer(asset: Exclude<StellarAsset, "XLM">): string {
  const envName = asset === "USDC" ? "STELLAR_USDC_ISSUER" : "STELLAR_USDT_ISSUER";
  const fromEnv = process.env[envName];
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv.trim();
  }
  return DEFAULT_TESTNET_ISSUERS[asset];
}

/** Build a Stellar Asset for a supported on-chain code. */
export function getAsset(code: StellarAsset): Asset {
  if (code === "XLM") {
    return Asset.native();
  }
  return new Asset(code, readIssuer(code));
}

export function nativeAsset(): Asset {
  return Asset.native();
}
