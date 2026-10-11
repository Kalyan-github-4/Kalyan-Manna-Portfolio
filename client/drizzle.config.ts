import { defineConfig } from "drizzle-kit"

// drizzle-kit runs outside Next, so nothing has loaded .env.local for it.
if (!process.env.DATABASE_URL) process.loadEnvFile(".env.local")

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing")
}

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
})
