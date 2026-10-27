export interface Blog {
  id: number
  title: string
  author: string
  url: string
  likes: number
}

const blogs: Blog[] = [
  {
    id: 1,
    title: "Luka toystory",
    author: "Luka Ong",
    url: "https://lukaong.toystory.com/",
    likes: 7,
  },
  {
    id: 2,
    title: "Dog is the best friend",
    author: "Super Doper Luka",
    url: "https://dogbethebestfriend.lukaong.com.sg",
    likes: 5,
  },
  {
    id: 3,
    title: "Chief happiness officer",
    author: "Luka the Great",
    url: "https://cho.lukathegreat.html",
    likes: 12,
  },
]

let nextId = 4

export const getBlogs = () => {
  return blogs
}

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
}

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 })
}

export const incrementLikes = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id)
  if (blog) {
    blog.likes += 1
  }
}