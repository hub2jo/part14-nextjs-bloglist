import { defineConfig } from "@playwright/test"
import dotenv from "dotenv"

// always load the TEST database, locally and in CI
dotenv.config({ path: ".env.test", quiet: true })

export default defineConfig({
  testDir: "./tests",
  // tests share the same database, so they can not be run in parallel
  workers: 1,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? "html" : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: false,
  },
})
