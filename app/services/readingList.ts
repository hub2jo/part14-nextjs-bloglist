import { and, asc, eq } from "drizzle-orm"
import { db } from "@/db"
import { readingList } from "@/db/schema"

export const addToReadingList = async (userId: number, blogId: number) => {
  await db
    .insert(readingList)
    .values({ userId, blogId })
    .onConflictDoNothing()
}

export const isInReadingList = async (userId: number, blogId: number) => {
  const entry = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)),
  })
  return entry !== undefined
}

export const getReadingList = async (userId: number) => {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: { blog: true },
    orderBy: [asc(readingList.id)],
  })
}