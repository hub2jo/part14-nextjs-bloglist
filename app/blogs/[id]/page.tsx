import { notFound } from "next/navigation"
import { getBlogById } from "@/app/services/blogs"
import { getCurrentUser } from "@/app/services/session"
import { isInReadingList } from "@/app/services/readingList"
import { likeBlog } from "@/app/actions/blogs"
import { addBlogToReadingList } from "@/app/actions/readingList"
import Button from "@/app/components/Button"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  const user = await getCurrentUser()
  const isOwnBlog = user?.id === blog.userId
  const inList = user && !isOwnBlog ? await isInReadingList(user.id, blog.id) : false

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

        {user && !isOwnBlog && (
          <div className="pt-2">
            {inList ? (
              <p className="text-green-600 text-sm">✓ in your reading list</p>
            ) : (
              <form action={addBlogToReadingList}>
                <input type="hidden" name="blogId" value={blog.id} />
                <Button type="submit">add to reading list</Button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPage