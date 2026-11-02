import { eq, desc } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users, blogs } from "@/db/schema"

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      blogs: {
        orderBy: [desc(blogs.likes)],
      },
    },
  })
}

export const getUserByToken = async (token: string) => {
  return db.query.users.findFirst({
    where: eq(users.token, token),
    columns: {
      id: true,
      username: true,
      name: true,
    },
    with: {
      blogs: {
        columns: {
          id: true,
          title: true,
          author: true,
          url: true,
          likes: true,
        },
        orderBy: [desc(blogs.likes)],
      },
    },
  })
}

export const getUserByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    columns: { id: true },
  })
}

export const createUser = async (username: string, name: string, password: string) => {
  const passwordHash = await bcrypt.hash(password, 10)
  const [user] = await db
    .insert(users)
    .values({ username, name, passwordHash })
    .returning({ id: users.id, username: users.username, name: users.name })
  return user
}

export const regenerateToken = async (userId: number) => {
  const token = crypto.randomUUID()
  await db.update(users).set({ token }).where(eq(users.id, userId))
  return token
}