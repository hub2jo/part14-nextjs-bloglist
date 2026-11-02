import { redirect } from "next/navigation"
import { getCurrentUser } from "@/app/services/session"
import { getReadingList } from "@/app/services/readingList"
import { generateToken } from "@/app/actions/users"
import Button from "@/app/components/Button"
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
      <div data-testid="user-profile">
        <h2 className="text-2xl font-bold" data-testid="user-name">{user.name}</h2>
        <p className="text-gray-500" data-testid="user-username">@{user.username}</p>
      </div>

      <div className="border rounded p-6 space-y-6" data-testid="reading-list-section">
        <h3 className="text-lg font-semibold">Reading list</h3>
        {readingList.length === 0 ? (
          <p className="text-gray-500" data-testid="empty-reading-list">
            Your reading list is empty
          </p>
        ) : (
          <>
            <ReadingListSection
              title="Unread"
              entries={unread}
              emptyText="Nothing left to read"
              testId="unread-section"
              emptyTestId="no-unread-blogs"
            />
            <ReadingListSection
              title="Read"
              entries={read}
              emptyText="No blogs marked as read yet"
              testId="read-section"
              emptyTestId="no-read-blogs"
            />
          </>
        )}
      </div>

      <div className="border rounded p-6 space-y-4" data-testid="api-token-section">
        <h3 className="text-lg font-semibold">API token</h3>
        {user.token ? (
          <div data-testid="token-display">
            <code
              data-testid="api-token"
              className="block bg-gray-100 text-gray-800 rounded px-3 py-2 font-mono text-sm break-all select-all"
            >
              {user.token}
            </code>
          </div>
        ) : (
          <p className="text-gray-500" data-testid="no-token-message">
            No token has been generated yet
          </p>
        )}
        <form action={generateToken}>
          <Button type="submit" data-testid="generate-token-button">
            {user.token ? "Generate new token" : "Generate token"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default MePage
