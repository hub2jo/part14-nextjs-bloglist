"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, incrementLikes } from "../services/blogs"

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title")
  const author = formData.get("author")
  const url = formData.get("url")

  if (
    typeof title !== "string" || title.trim() === "" ||
    typeof author !== "string" || author.trim() === "" ||
    typeof url !== "string" || url.trim() === ""
  ) {
    throw new Error("title, author and url are required")
  }

  await addBlog(title.trim(), author.trim(), url.trim())

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