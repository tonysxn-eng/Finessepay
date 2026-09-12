import { loadStellarConfig, type StellarConfig } from "@finessepay/stellar";

export interface ApiEnv {
  host: string;
  port: number;
  corsOrigin: string[];
  stellar: StellarConfig;
}

function read(name: string, fallback: string): string {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : fallback;
}

export function loadApiEnv(): ApiEnv {
  const cors = read("CORS_ORIGIN", "http://localhost:3000");
  return {
    host: read("API_HOST", "0.0.0.0"),
    port: Number.parseInt(read("API_PORT", "3001"), 10),
    corsOrigin: cors.split(",").map((origin) => origin.trim()).filter(Boolean),
    stellar: loadStellarConfig(),
  };
}
