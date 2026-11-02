import { defineConfig } from "drizzle-kit"

import * as dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

const useProd = process.env.MIGRATE_PROD === "true"
const url = useProd ? process.env.PROD_DATABASE_URL : process.env.DATABASE_URL

if (!url) {
  throw new Error(
    useProd ? "PROD_DATABASE_URL is not set" : "DATABASE_URL is not set",
  )
}

console.log(`drizzle-kit target: ${useProd ? "PRODUCTION (main)" : "development (dev branch)"}`)

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url,
  },
})