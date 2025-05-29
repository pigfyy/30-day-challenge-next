import { neon, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

const pool = new Pool({ connectionString: process.env.POSTGRES_URL! });
const prodPool = new Pool({
  connectionString: process.env.POSTGRES_URL_PRODUCTION!,
});
export const db = drizzle(pool, { schema });
export const prodDb = drizzle(prodPool, { schema });

export * from "./schema";
export * from "./zod";
