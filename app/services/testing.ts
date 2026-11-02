import { sql } from "drizzle-orm"
import { db } from "@/db"

export const resetDatabase = async () => {
  await db.execute(
    sql`TRUNCATE TABLE reading_list, blogs, users RESTART IDENTITY CASCADE`,
  )
}