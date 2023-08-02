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
    <div className='blog-style'>
      <span className='blog-title'>
        {blog.title}
      </span>
      &nbsp;
      <span className='blog-author'>
        {blog.author}
      </span>
      <span style={hideWhenVisible}>
        <button className='blog-view' onClick={toggleVisibility}>view</button>
      </span>
      <span style={showWhenVisible}>
        <button className='blog-hide' onClick={toggleVisibility}>hide</button>
        <div>
          <div className="blog-url">{blog.url}</div>
          <span className="blog-likes">{blog.likes}</span>
          <button className='blog-like' onClick={() => addLike(blog.id)}>like</button>
          <div className="blog-username">{blog.user.name}</div>
        </div>
        {blog.user.username === user.username &&
          <button className='blog-remove' onClick={handleRemove}>remove</button>
        }
      </span>
    </div>
  )
}

export default Blog