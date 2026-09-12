import { Horizon } from "@stellar/stellar-sdk";
import { loadStellarConfig, type StellarConfig } from "./network.js";

export type HorizonServer = Horizon.Server;

let cached: { key: string; server: HorizonServer } | null = null;

function cacheKey(config: StellarConfig): string {
  return `${config.network}:${config.horizonUrl}`;
}

/** Create (or reuse) a Horizon.Server for the given config. */
export function getHorizonServer(config: StellarConfig = loadStellarConfig()): HorizonServer {
  const key = cacheKey(config);
  if (cached?.key === key) {
    return cached.server;
  }
  const server = new Horizon.Server(config.horizonUrl, { allowHttp: false });
  cached = { key, server };
  return server;
}

/** Reset the process-wide Horizon cache. Useful in tests. */
export function resetHorizonServer(): void {
  cached = null;
}
