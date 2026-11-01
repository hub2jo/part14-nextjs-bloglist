import Link from "next/link"

const Home = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-3xl font-bold">Blog app</h2>
      <p className="text-gray-500">Full Stack Open Next.js exercises</p>
      <Link
        href="/blogs"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
      >
        Browse blogs
      </Link>
    </div>
  )
}

export default Home