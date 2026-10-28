import Link from "next/link"
import Form from "next/form"
import { getBlogs } from "../services/blogs"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const term = filter?.trim() ?? ""

  const blogs = await getBlogs(term)

  return (
    <div>
      <h2>Blogs</h2>

      <Form action="/blogs">
        <input
          key={filter ?? ""}
          type="text"
          name="filter"
          defaultValue={filter ?? ""}
          placeholder="search by title"
        />
        <button type="submit">search</button>
        {term && <Link href="/blogs">clear</Link>}
      </Form>

      {term && blogs.length === 0 && <p>no blogs match &quot;{filter}&quot;</p>}

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}, {blog.likes} likes
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs