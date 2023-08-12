import { useQuery } from 'react-query'
import { getAllBlogs } from '../requests-blogs'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

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
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>
      {blogs
        .sort((a, b) => (a.likes > b.likes ? 1 : -1))
        .reverse()
        .map((blog) => (
          <div key={blog.id} className="blog-style">
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        ))}
    </div>
  )
}

export default BlogList
