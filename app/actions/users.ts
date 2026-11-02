"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/app/services/session"
import {
  createUser,
  getUserByUsername,
  regenerateToken,
} from "@/app/services/users"

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

  if (!errors.username && (await getUserByUsername(username))) {
    errors.username = "username is already taken"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name } }
  }

  await createUser(username, name, password)

  redirect("/login")
}

export const generateToken = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  await regenerateToken(user.id)

  revalidatePath("/me")
}