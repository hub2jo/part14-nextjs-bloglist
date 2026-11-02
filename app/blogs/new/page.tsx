"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog } from "@/app/actions/blogs"
import { useNotification } from "@/app/components/NotificationContext"
import FormField from "@/app/components/FormField"
import Button from "@/app/components/Button"

const initialState: Parameters<typeof createBlog>[0] = {
  errors: {},
  values: { title: "", author: "", url: "" },
  success: false,
}

const NewBlog = () => {
  const [state, formAction, pending] = useActionState(createBlog, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification(`a new blog "${state.values.title}" added`)
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
      <form action={formAction} className="space-y-4">
        <FormField
          label="Title"
          type="text"
          name="title"
          defaultValue={state.values.title}
          error={state.errors.title}
        />
        <FormField
          label="Author"
          type="text"
          name="author"
          defaultValue={state.values.author}
          error={state.errors.author}
        />
        <FormField
          label="URL"
          type="text"
          name="url"
          defaultValue={state.values.url}
          error={state.errors.url}
        />
        <Button type="submit" disabled={pending || state.success} className="w-full" data-testid="create-blog-button">
          Create
        </Button>
      </form>
    </div>
  )
}

export default NewBlog