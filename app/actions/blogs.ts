"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog } from "../services/blogs"

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

  addBlog(title.trim(), author.trim(), url.trim())

  revalidatePath("/blogs")
  redirect("/blogs")
}