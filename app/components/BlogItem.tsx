import Link from "next/link"
import type { blogs } from "@/db/schema"

type Blog = typeof blogs.$inferSelect

interface BlogItemProps {
  blog: Pick<Blog, "id" | "title" | "author" | "likes">
}

const BlogItem = ({ blog }: BlogItemProps) => {
  return (
    <li className="border rounded p-3 flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-800">
      <div>
        <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:underline font-medium">
          {blog.title}
        </Link>
        <p className="text-sm text-gray-500">by {blog.author}</p>
      </div>
      <span className="text-sm bg-gray-100 text-gray-700 rounded-full px-3 py-1 whitespace-nowrap">
        {blog.likes} likes
      </span>
    </li>
  )
}

export default BlogItem