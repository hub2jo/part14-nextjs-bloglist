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
  // temporary: no login yet, so assign a random user
  const user = await db.query.users.findFirst({
    orderBy: sql`RANDOM()`,
  })

  if (!user) {
    throw new Error("cannot create a blog: no users exist")
  }

  await db.insert(blogs).values({ title, author, url, userId: user.id })
}

export const incrementLikes = async (id: number) => {
  await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id))
}