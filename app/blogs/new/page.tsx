"use client"

import { useActionState } from "react"
import { createBlog } from "@/app/actions/blogs"

const initialState: Parameters<typeof createBlog>[0] = {
  errors: {},
  values: { title: "", author: "", url: "" },
}

const NewBlog = () => {
  const [state, formAction, pending] = useActionState(createBlog, initialState)

  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input type="text" name="title" defaultValue={state.values.title} />
          </label>
          {state.errors.title && <p style={{ color: "red" }}>{state.errors.title}</p>}
        </div>
        <div>
          <label>
            Author
            <input type="text" name="author" defaultValue={state.values.author} />
          </label>
          {state.errors.author && <p style={{ color: "red" }}>{state.errors.author}</p>}
        </div>
        <div>
          <label>
            URL
            <input type="text" name="url" defaultValue={state.values.url} />
          </label>
          {state.errors.url && <p style={{ color: "red" }}>{state.errors.url}</p>}
        </div>
        <button type="submit" disabled={pending}>Create</button>
      </form>
    </div>
  )
}

export default NewBlog
