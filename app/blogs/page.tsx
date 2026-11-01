import Link from "next/link"
import Form from "next/form"
import { getBlogs } from "@/app/services/blogs"
import Button from "@/app/components/Button"
import BlogItem from "@/app/components/BlogItem"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const term = filter?.trim() ?? ""

  const blogs = await getBlogs(term)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>

      <Form action="/blogs" className="flex items-center gap-2 mb-6">
        <input
          key={filter ?? ""}
          type="text"
          name="filter"
          defaultValue={filter ?? ""}
          placeholder="search by title"
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button type="submit">search</Button>
        {term && (
          <Link href="/blogs" className="text-blue-600 hover:underline">
            clear
          </Link>
        )}
      </Form>

      {term && blogs.length === 0 && (
        <p className="text-gray-500">no blogs match &quot;{filter}&quot;</p>
      )}

      <ul className="space-y-2">
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  )
}

export default Blogs