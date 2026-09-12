import { afterEach, describe, expect, it } from "vitest";
import {
  DEFAULT_HORIZON_URLS,
  assertTestnet,
  loadStellarConfig,
} from "./network.js";

const original = { ...process.env };

afterEach(() => {
  process.env.STELLAR_NETWORK = original.STELLAR_NETWORK;
  process.env.STELLAR_HORIZON_URL = original.STELLAR_HORIZON_URL;
  process.env.STELLAR_NETWORK_PASSPHRASE = original.STELLAR_NETWORK_PASSPHRASE;
  delete process.env.STELLAR_NETWORK;
  delete process.env.STELLAR_HORIZON_URL;
  delete process.env.STELLAR_NETWORK_PASSPHRASE;
});

describe("loadStellarConfig", () => {
  it("defaults to testnet Horizon", () => {
    const config = loadStellarConfig();
    expect(config.network).toBe("testnet");
    expect(config.horizonUrl).toBe(DEFAULT_HORIZON_URLS.testnet);
    expect(config.networkPassphrase).toBe("Test SDF Network ; September 2015");
  });

  it("honours STELLAR_HORIZON_URL", () => {
    process.env.STELLAR_HORIZON_URL = "https://horizon-custom.test";
    expect(loadStellarConfig().horizonUrl).toBe("https://horizon-custom.test");
  });
});

describe("assertTestnet", () => {
  it("throws on public network", () => {
    expect(() =>
      assertTestnet({
        network: "public",
        horizonUrl: DEFAULT_HORIZON_URLS.public,
        networkPassphrase: "Public Global Stellar Network ; September 2015",
      }),
    ).toThrow(/testnet-first/);
  });
});
