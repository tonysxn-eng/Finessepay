/** Versioned HTTP paths shared by the API and the web client. */
export const API_ROUTES = {
  health: "/health",
  account: (accountId: string) => `/v1/accounts/${encodeURIComponent(accountId)}`,
  balances: (accountId: string) =>
    `/v1/accounts/${encodeURIComponent(accountId)}/balances`,
} as const;

export interface HealthResponse {
  status: "ok";
  service: "finessepay-api";
  network: string;
  timestamp: string;
}

export interface AccountBalance {
  asset: string;
  assetType: string;
  issuer?: string;
  balance: string;
  buyingLiabilities?: string;
  sellingLiabilities?: string;
}

export interface AccountResponse {
  accountId: string;
  network: string;
  sequence: string;
  balances: AccountBalance[];
  subentryCount: number;
}
