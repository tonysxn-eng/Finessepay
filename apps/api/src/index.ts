import { config as loadDotenv } from "dotenv";
import { resolve } from "node:path";
import { buildApp } from "./app.js";
import { loadApiEnv } from "./env.js";

// Load repo-root .env first, then apps/api/.env (the latter wins).
loadDotenv({ path: resolve(process.cwd(), "../../.env") });
loadDotenv({ path: resolve(process.cwd(), ".env"), override: true });

const env = loadApiEnv();
const app = await buildApp(env);

try {
  await app.listen({ host: env.host, port: env.port });
  app.log.info(
    { network: env.stellar.network, horizon: env.stellar.horizonUrl },
    `FinessePay API listening on ${env.host}:${env.port}`,
  );
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
