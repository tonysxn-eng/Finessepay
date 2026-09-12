/** On-chain assets FinessePay can receive on Stellar. */
export const STELLAR_ASSETS = ["XLM", "USDC", "USDT"] as const;
export type StellarAsset = (typeof STELLAR_ASSETS)[number];

/** Local fiat currencies FinessePay aims to pay out. */
export const FIAT_CURRENCIES = ["NGN", "USD", "EUR", "JPY"] as const;
export type FiatCurrency = (typeof FIAT_CURRENCIES)[number];

export type CurrencyCode = StellarAsset | FiatCurrency;

export interface CurrencyMeta {
  code: CurrencyCode;
  name: string;
  kind: "stellar" | "fiat";
  /** ISO-4217 / common symbol for display only. */
  symbol: string;
  decimals: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyMeta> = {
  XLM: { code: "XLM", name: "Lumens", kind: "stellar", symbol: "XLM", decimals: 7 },
  USDC: { code: "USDC", name: "USD Coin", kind: "stellar", symbol: "USDC", decimals: 7 },
  USDT: { code: "USDT", name: "Tether USD", kind: "stellar", symbol: "USDT", decimals: 7 },
  NGN: { code: "NGN", name: "Nigerian Naira", kind: "fiat", symbol: "₦", decimals: 2 },
  USD: { code: "USD", name: "US Dollar", kind: "fiat", symbol: "$", decimals: 2 },
  EUR: { code: "EUR", name: "Euro", kind: "fiat", symbol: "€", decimals: 2 },
  JPY: { code: "JPY", name: "Japanese Yen", kind: "fiat", symbol: "¥", decimals: 0 },
};

export function isStellarAsset(code: string): code is StellarAsset {
  return (STELLAR_ASSETS as readonly string[]).includes(code);
}

export function isFiatCurrency(code: string): code is FiatCurrency {
  return (FIAT_CURRENCIES as readonly string[]).includes(code);
}
