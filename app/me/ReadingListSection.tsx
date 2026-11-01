import Link from "next/link"
import { markBlogAsRead } from "@/app/actions/readingList"
import Button from "@/app/components/Button"
import type { getReadingList } from "@/app/services/readingList"

type ReadingListEntry = Awaited<ReturnType<typeof getReadingList>>[number]

interface ReadingListSectionProps {
  title: string
  entries: ReadingListEntry[]
  emptyText: string
}

const ReadingListSection = ({ title, entries, emptyText }: ReadingListSectionProps) => {
  return (
    <section className="space-y-2">
      <h4 className="font-semibold">
        {title} <span className="text-gray-500 font-normal">({entries.length})</span>
      </h4>
      {entries.length === 0 ? (
        <p className="text-sm text-gray-500">{emptyText}</p>
      ) : (
        <ul className="space-y-2">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center justify-between gap-4 border rounded p-3"
            >
              <div>
                <Link
                  href={`/blogs/${entry.blog.id}`}
                  className={
                    entry.read
                      ? "text-gray-500 hover:underline line-through"
                      : "text-blue-600 hover:underline font-medium"
                  }
                >
                  {entry.blog.title}
                </Link>
                <p className="text-sm text-gray-500">by {entry.blog.author}</p>
              </div>
              {!entry.read && (
                <form action={markBlogAsRead}>
                  <input type="hidden" name="entryId" value={entry.id} />
                  <Button type="submit" className="text-sm whitespace-nowrap">
                    mark as read
                  </Button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ReadingListSection