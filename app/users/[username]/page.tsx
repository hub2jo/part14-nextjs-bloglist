import { notFound } from "next/navigation"
import { getUserWithBlogs } from "@/app/services/users"
import BlogItem from "@/app/components/BlogItem"

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>
}) => {
  const { username } = await params
  const user = await getUserWithBlogs(username)

  if (!user) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-gray-500 mb-6">@{user.username}</p>
      <h3 className="text-lg font-semibold mb-2">Added blogs</h3>
      {user.blogs.length === 0 ? (
        <p className="text-gray-500">no blogs added yet</p>
      ) : (
        <ul className="space-y-2">
          {user.blogs.map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserPage