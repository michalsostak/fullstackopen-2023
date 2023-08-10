import Blog from './Blog'
import { useQuery } from 'react-query'
import { getAllBlogs } from '../requests'

const BlogList = () => {
  const { isLoading, isError, data, error } = useQuery('blogs', getAllBlogs, {
    refetchOnWindowFocus: false,
    retry: 1
  })

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (isLoading) {
    return <span>blogs are loading...</span>
  }

  const blogs = data

  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => (a.likes > b.likes ? 1 : -1))
        .reverse()
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )
}

export default BlogList
