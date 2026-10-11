import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js"
import postgres from "postgres"

// Cached on globalThis so dev hot-reloads and warm serverless invocations reuse
// one pool instead of opening a new set of connections each time.
const globalForDb = globalThis as unknown as { db?: PostgresJsDatabase }

// Lazy so that `next build` can load the route modules without DATABASE_URL.
export function getDb() {
  if (globalForDb.db) return globalForDb.db

  const url = process.env.DATABASE_URL
  if (!url) throw new Error("DATABASE_URL is missing")

  globalForDb.db = drizzle(postgres(url, { ssl: "require" }))
  return globalForDb.db
}
