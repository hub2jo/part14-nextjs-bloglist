"use server"

import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"

export const registerUser = async (formData: FormData) => {
  const username = formData.get("username")
  const name = formData.get("name")
  const password = formData.get("password")

  if (
    typeof username !== "string" || username.trim() === "" ||
    typeof name !== "string" || name.trim() === "" ||
    typeof password !== "string" || password.length < 3
  ) {
    redirect("/register?error=invalid")
  }

  const existing = await db.query.users.findFirst({
    where: eq(users.username, username.trim()),
  })
  if (existing) {
    redirect("/register?error=taken")
  }

  const passwordHash = await bcrypt.hash(password, 10)
  await db.insert(users).values({
    username: username.trim(),
    name: name.trim(),
    passwordHash,
  })

  redirect("/login")
}