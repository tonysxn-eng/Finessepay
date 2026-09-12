import cors from "@fastify/cors";
import Fastify, { type FastifyInstance } from "fastify";
import { API_ROUTES } from "@finessepay/shared";
import { getBalances, loadAccount } from "@finessepay/stellar";
import type { ApiEnv } from "./env.js";

export async function buildApp(env: ApiEnv): Promise<FastifyInstance> {
  const app = Fastify({
    logger: true,
  });

  await app.register(cors, {
    origin: env.corsOrigin,
  });

  app.get(API_ROUTES.health, async () => ({
    status: "ok" as const,
    service: "finessepay-api" as const,
    network: env.stellar.network,
    timestamp: new Date().toISOString(),
  }));

  app.get<{ Params: { accountId: string } }>(
    "/v1/accounts/:accountId",
    async (request, reply) => {
      const result = await loadAccount(request.params.accountId, env.stellar);
      if (!result.ok) {
        const status = result.error.includes("not found") ? 404 : 400;
        return reply.status(status).send({ error: result.error });
      }
      return result.value;
    },
  );

  app.get<{ Params: { accountId: string } }>(
    "/v1/accounts/:accountId/balances",
    async (request, reply) => {
      const result = await getBalances(request.params.accountId, env.stellar);
      if (!result.ok) {
        const status = result.error.includes("not found") ? 404 : 400;
        return reply.status(status).send({ error: result.error });
      }
      return {
        accountId: request.params.accountId,
        network: env.stellar.network,
        balances: result.value,
      };
    },
  );

  return app;
}
