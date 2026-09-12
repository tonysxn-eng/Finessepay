import { describe, expect, it } from "vitest";
import { isValidAccountId, mapBalance } from "./account.js";
import { NETWORK_PASSPHRASES } from "./network.js";

describe("isValidAccountId", () => {
  it("accepts a well-formed ed25519 public key", () => {
    expect(
      isValidAccountId("GBRPYHIL2CI3FNQ4BXLFMNDLFJUNPU2HY3ZMFSHONUCEOASW7QC7OX2H"),
    ).toBe(true);
  });

  it("rejects empty and malformed ids", () => {
    expect(isValidAccountId("")).toBe(false);
    expect(isValidAccountId("not-a-stellar-key")).toBe(false);
    expect(isValidAccountId("GSHORT")).toBe(false);
  });
});

describe("mapBalance", () => {
  it("maps native XLM", () => {
    expect(
      mapBalance({
        asset_type: "native",
        balance: "10.0000000",
        buying_liabilities: "0.0000000",
        selling_liabilities: "0.0000000",
      }),
    ).toEqual({
      asset: "XLM",
      assetType: "native",
      issuer: undefined,
      balance: "10.0000000",
      buyingLiabilities: "0.0000000",
      sellingLiabilities: "0.0000000",
    });
  });

  it("maps a credit_alphanum4 asset", () => {
    expect(
      mapBalance({
        asset_type: "credit_alphanum4",
        asset_code: "USDC",
        asset_issuer: "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5",
        balance: "25.5000000",
      }),
    ).toMatchObject({
      asset: "USDC",
      assetType: "credit_alphanum4",
      issuer: "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5",
      balance: "25.5000000",
    });
  });
});

describe("network passphrases", () => {
  it("exposes the published testnet passphrase", () => {
    expect(NETWORK_PASSPHRASES.testnet).toBe("Test SDF Network ; September 2015");
  });
});
