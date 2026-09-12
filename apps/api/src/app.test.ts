import { afterAll, describe, expect, it } from "vitest";
import { DEFAULT_HORIZON_URLS, NETWORK_PASSPHRASES } from "@finessepay/stellar";
import { buildApp } from "./app.js";

const app = await buildApp({
  host: "127.0.0.1",
  port: 0,
  corsOrigin: ["http://localhost:3000"],
  stellar: {
    network: "testnet",
    horizonUrl: DEFAULT_HORIZON_URLS.testnet,
    networkPassphrase: NETWORK_PASSPHRASES.testnet,
  },
});

afterAll(async () => {
  await app.close();
});

describe("GET /health", () => {
  it("reports ok and testnet", async () => {
    const response = await app.inject({ method: "GET", url: "/health" });
    expect(response.statusCode).toBe(200);
    const body = response.json() as { status: string; network: string; service: string };
    expect(body.status).toBe("ok");
    expect(body.network).toBe("testnet");
    expect(body.service).toBe("finessepay-api");
  });
});

describe("GET /v1/accounts/:accountId", () => {
  it("rejects an invalid account id", async () => {
    const response = await app.inject({ method: "GET", url: "/v1/accounts/not-valid" });
    expect(response.statusCode).toBe(400);
    expect(response.json()).toMatchObject({ error: expect.stringContaining("Invalid") });
  });
});
