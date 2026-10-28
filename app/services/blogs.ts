import { desc, asc, eq, ilike, sql } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

export const getBlogs = async (titleFilter: string) => {
  return db.query.blogs.findMany({
    where: titleFilter ? ilike(blogs.title, `%${titleFilter}%`) : undefined,
    orderBy: [desc(blogs.likes), asc(blogs.id)],
  })
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const addBlog = async (title: string, author: string, url: string) => {
  await db.insert(blogs).values({ title, author, url })
}

export const incrementLikes = async (id: number) => {
  await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id))
}