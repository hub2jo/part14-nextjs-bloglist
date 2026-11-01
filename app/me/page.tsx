import { redirect } from "next/navigation"
import { getCurrentUser } from "@/app/services/session"
import { generateToken } from "@/app/actions/users"
import Button from "@/app/components/Button"
import Link from "next/link"
import { getReadingList } from "@/app/services/readingList"
import ReadingListSection from "./ReadingListSection"

const MePage = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const readingList = await getReadingList(user.id)
  const unread = readingList.filter((entry) => !entry.read)
  const read = readingList.filter((entry) => entry.read)

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-500">@{user.username}</p>
      </div>
      
      <div className="border rounded p-6 space-y-6">
        <h3 className="text-lg font-semibold">Reading list</h3>
        <ReadingListSection
          title="Unread"
          entries={unread}
          emptyText="Nothing left to read"
        />
        <ReadingListSection
          title="Read"
          entries={read}
          emptyText="No blogs marked as read yet"
        />
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