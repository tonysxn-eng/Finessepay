# `@finessepay/stellar`

Testnet-first Stellar helpers for FinessePay.

```ts
import { loadAccount, getBalances, loadStellarConfig } from "@finessepay/stellar";

const config = loadStellarConfig(); // defaults to testnet Horizon
const account = await loadAccount("G...", config);

if (account.ok) {
  console.log(account.value.balances);
}
```

Public Horizon URLs and network passphrases are **not secrets**. Signing keys never belong in this package.
