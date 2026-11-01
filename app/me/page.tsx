import { redirect } from "next/navigation"
import { getCurrentUser } from "@/app/services/session"
import { generateToken } from "@/app/actions/users"
import Button from "@/app/components/Button"
import Link from "next/link"
import { getReadingList } from "@/app/services/readingList"

const MePage = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const readingList = await getReadingList(user.id)

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-500">@{user.username}</p>
      </div>
      
      <div className="border rounded p-6 space-y-4">
        <h3 className="text-lg font-semibold">Reading list</h3>
        {readingList.length === 0 ? (
          <p className="text-gray-500">Your reading list is empty</p>
        ) : (
          <ul className="space-y-2">
            {readingList.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center justify-between gap-4 border rounded p-3"
              >
                <div>
                  <Link
                    href={`/blogs/${entry.blog.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {entry.blog.title}
                  </Link>
                  <p className="text-sm text-gray-500">by {entry.blog.author}</p>
                </div>
                <span
                  className={
                    entry.read
                      ? "text-sm rounded-full px-3 py-1 bg-green-100 text-green-700"
                      : "text-sm rounded-full px-3 py-1 bg-gray-100 text-gray-700"
                  }
                >
                  {entry.read ? "read" : "unread"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border rounded p-6 space-y-4">
        <h3 className="text-lg font-semibold">API token</h3>
        {user.token ? (
          <code className="block bg-gray-100 text-gray-800 rounded px-3 py-2 font-mono text-sm break-all select-all">
            {user.token}
          </code>
        ) : (
          <p className="text-gray-500">No token has been generated yet</p>
        )}
        <form action={generateToken}>
          <Button type="submit">
            {user.token ? "Generate new token" : "Generate token"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default MePage