"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, incrementLikes } from "../services/blogs"
import { auth } from "@/auth"

type BlogFormState = {
  errors: { title?: string; author?: string; url?: string }
  values: { title: string; author: string; url: string }
}

export const createBlog = async (
  prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const values = {
    title: String(formData.get("title") ?? "").trim(),
    author: String(formData.get("author") ?? "").trim(),
    url: String(formData.get("url") ?? "").trim(),
  }

  const errors: BlogFormState["errors"] = {}
  for (const field of ["title", "author", "url"] as const) {
    if (!values[field]) {
      errors[field] = `${field} is required`
    } else if (values[field].length < 5) {
      errors[field] = `${field} must be at least 5 characters long`
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values }
  }

  await addBlog(values.title, values.author, values.url)

  revalidatePath("/blogs")
  redirect("/blogs")
}

export const likeBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))

  if (!Number.isInteger(id)) {
    throw new Error("invalid blog id")
  }

  await incrementLikes(id)

  revalidatePath(`/blogs/${id}`)
  revalidatePath('/blogs')
}