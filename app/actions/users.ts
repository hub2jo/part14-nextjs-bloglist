"use server"

import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"

type RegisterFormState = {
  errors: {
    username?: string
    name?: string
    password?: string
    passwordConfirm?: string
  }
  values: { username: string; name: string }
}

export const registerUser = async (
  prevState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> => {
  const username = String(formData.get("username") ?? "").trim()
  const name = String(formData.get("name") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "")

  const errors: RegisterFormState["errors"] = {}

  if (username.length < 4) {
    errors.username = "username must be at least 4 characters long"
  }
  if (!name) {
    errors.name = "name is required"
  }
  if (password.length < 4) {
    errors.password = "password must be at least 4 characters long"
  }
  if (password !== passwordConfirm) {
    errors.passwordConfirm = "passwords do not match"
  }

  if (!errors.username) {
    const existing = await db.query.users.findFirst({
      where: eq(users.username, username),
    })
    if (existing) {
      errors.username = "username is already taken"
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name } }
  }

  const passwordHash = await bcrypt.hash(password, 10)
  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}