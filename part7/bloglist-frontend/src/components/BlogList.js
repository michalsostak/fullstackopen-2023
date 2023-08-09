import Blog from './Blog'

const BlogList = ({ blogs, increaseLikes, user, deleteBlog }) => (
  <div>
    <h2>blogs</h2>
    {blogs
      .sort((a, b) => (a.likes > b.likes ? 1 : -1))
      .reverse()
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          increaseLikes={increaseLikes}
          user={user}
          deleteBlog={deleteBlog}
        />
      ))}
  </div>
)

export default BlogList
