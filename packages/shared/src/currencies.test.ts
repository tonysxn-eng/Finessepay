import { describe, expect, it } from "vitest";
import {
  CURRENCIES,
  FIAT_CURRENCIES,
  STELLAR_ASSETS,
  isFiatCurrency,
  isStellarAsset,
} from "./currencies.js";

describe("currencies", () => {
  it("lists the Stage 0 stellar assets", () => {
    expect([...STELLAR_ASSETS]).toEqual(["XLM", "USDC", "USDT"]);
  });

  it("lists the Stage 0 fiat currencies", () => {
    expect([...FIAT_CURRENCIES]).toEqual(["NGN", "USD", "EUR", "JPY"]);
  });

  it("narrows asset codes", () => {
    expect(isStellarAsset("XLM")).toBe(true);
    expect(isStellarAsset("NGN")).toBe(false);
    expect(isFiatCurrency("NGN")).toBe(true);
    expect(isFiatCurrency("USDC")).toBe(false);
  });

  it("has metadata for every supported code", () => {
    for (const code of [...STELLAR_ASSETS, ...FIAT_CURRENCIES]) {
      expect(CURRENCIES[code].code).toBe(code);
    }
  });
});
