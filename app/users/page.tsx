import Link from "next/link"
import { getUsers } from "@/app/services/users"

const Users = async () => {
  const users = await getUsers()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="border rounded p-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Link
              href={`/users/${encodeURIComponent(user.username)}`}
              className="text-blue-600 hover:underline font-medium"
            >
              {user.name}
            </Link>
            <span className="text-sm text-gray-500">@{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users