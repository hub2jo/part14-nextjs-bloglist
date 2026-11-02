import { defineConfig } from "drizzle-kit"

import * as dotenv from "dotenv"

// CI (GitHub Actions) and explicit test runs use .env.test, everything else .env.local
const isTest = process.env.CI === "true" || process.env.NODE_ENV === "test"
dotenv.config({ path: isTest ? ".env.test" : ".env.local", quiet: true })

const useProd = process.env.MIGRATE_PROD === "true"
const url = useProd ? process.env.PROD_DATABASE_URL : process.env.DATABASE_URL

if (!url) {
  throw new Error(
    useProd ? "PROD_DATABASE_URL is not set" : "DATABASE_URL is not set",
  )
}

const target = useProd ? "PRODUCTION (main)" : isTest ? "test" : "development (dev branch)"
console.log(`drizzle-kit target: ${target}`)

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url,
  },
})