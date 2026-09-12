import { afterEach, describe, expect, it, vi } from "vitest";
import { fundTestnetAccount } from "./friendbot.js";
import { NETWORK_PASSPHRASES } from "./network.js";

const ACCOUNT = "GBRPYHIL2CI3FNQ4BXLFMNDLFJUNPU2HY3ZMFSHONUCEOASW7QC7OX2H";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fundTestnetAccount", () => {
  it("refuses to run against pubnet", async () => {
    const result = await fundTestnetAccount(ACCOUNT, {
      network: "public",
      horizonUrl: "https://horizon.stellar.org",
      networkPassphrase: NETWORK_PASSPHRASES.public,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toMatch(/testnet/i);
    }
  });

  it("calls Friendbot with the account id", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ hash: "abc123" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await fundTestnetAccount(ACCOUNT, {
      network: "testnet",
      horizonUrl: "https://horizon-testnet.stellar.org",
      networkPassphrase: NETWORK_PASSPHRASES.testnet,
      friendbotUrl: "https://friendbot.stellar.org",
    });

    expect(result).toEqual({ ok: true, value: { accountId: ACCOUNT, hash: "abc123" } });
    expect(fetchMock).toHaveBeenCalledOnce();
    const calledWith = String(fetchMock.mock.calls[0]?.[0]);
    expect(calledWith).toContain("addr=");
    expect(calledWith).toContain(ACCOUNT);
  });
});
