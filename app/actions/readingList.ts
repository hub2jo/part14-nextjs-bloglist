"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/app/services/session"
import { addToReadingList, markAsRead } from "@/app/services/readingList"

export const addBlogToReadingList = async (formData: FormData) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const blogId = Number(formData.get("blogId"))
  if (!Number.isInteger(blogId)) {
    throw new Error("invalid blog id")
  }

  await addToReadingList(user.id, blogId)

  revalidatePath(`/blogs/${blogId}`)
  revalidatePath("/me")
}

export const markBlogAsRead = async (formData: FormData) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const entryId = Number(formData.get("entryId"))
  if (!Number.isInteger(entryId)) {
    throw new Error("invalid reading list entry id")
  }

  await markAsRead(entryId, user.id)

  revalidatePath("/me")
}