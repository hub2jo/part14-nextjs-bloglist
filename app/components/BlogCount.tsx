import { getBlogs } from "@/app/services/blogs"

const BlogCount = async () => {
  const blogs = await getBlogs("")
  return <strong>{blogs.length}</strong>
}

export default BlogCount