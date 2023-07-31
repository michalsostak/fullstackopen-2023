import { useState } from 'react'

const Blog = ({ blog, increaseLikes, user, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = (blogId) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    increaseLikes(blogId, updatedBlog)
  }

  const handleRemove = () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`) && deleteBlog(blog.id)
  }

  return (
    <div className='blogStyle'>
      {blog.title} {blog.author}
      <span style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
      </span>
      <span style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
        <div>
          {blog.url}
          <br />
          likes {blog.likes}
          <button onClick={() => addLike(blog.id)}>like</button>
          <br />
          {blog.user.name}
        </div>
        {blog.user.username === user.username &&
          <button onClick={handleRemove}>remove</button>
        }
      </span>
    </div>
  )
}

export default Blog