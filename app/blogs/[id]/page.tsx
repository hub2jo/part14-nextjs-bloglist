import { notFound } from "next/navigation"
import { getBlogById } from "@/app/services/blogs"
import { likeBlog } from "@/app/actions/blogs"
import Button from "@/app/components/Button"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="border rounded p-6 space-y-3">
        <h2 className="text-2xl font-bold">{blog.title}</h2>
        <p className="text-gray-500">by {blog.author}</p>
        <a
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-blue-600 hover:underline break-all"
        >
          {blog.url}
        </a>
        <div className="flex items-center gap-4 pt-2">
          <span className="text-lg font-semibold">{blog.likes} likes</span>
          <form action={likeBlog}>
            <input type="hidden" name="id" value={blog.id} />
            <Button type="submit">like</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BlogPage