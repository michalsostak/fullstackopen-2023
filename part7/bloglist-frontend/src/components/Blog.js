import { useState } from 'react'
import { useUserValue } from '../UserContext'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'
import { updateBlog, deleteBlog } from '../requests-blogs'

const Blog = ({ blog }) => {
  const [comment, setComment] = useState('')

  // const [visible, setVisible] = useState(false)

  // const hideWhenVisible = { display: visible ? 'none' : '' }
  // const showWhenVisible = { display: visible ? '' : 'none' }

  const queryClient = useQueryClient()
  const userValue = useUserValue()
  const dispatchNotification = useNotificationDispatch()

  const updateLikeMutation = useMutation(updateBlog, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      )
      dispatchNotification({
        type: 'notify',
        payload: {
          content: `like for blog ${updatedBlog.title} are now: ${updatedBlog.likes}`,
          messageType: 'success'
        }
      })
    },
    onError: (error) => {
      dispatchNotification({
        type: 'notify',
        payload: {
          content: error.response.data.error,
          messageType: 'error'
        }
      })
    }
  })

  const updateCommentMutation = useMutation(updateBlog, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      )
      dispatchNotification({
        type: 'notify',
        payload: {
          content: `new comment for blog ${updatedBlog.title} added`,
          messageType: 'success'
        }
      })
    },
    onError: (error) => {
      dispatchNotification({
        type: 'notify',
        payload: {
          content: error.response.data.error,
          messageType: 'error'
        }
      })
    }
  })

  const deleteBlogMutation = useMutation(deleteBlog, {
    onSuccess: (data, variables) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        blogs.filter((b) => b.id !== variables.blogId)
      )
      dispatchNotification({
        type: 'notify',
        payload: {
          content: `removed blog with id ${variables.blogId}`,
          messageType: 'success'
        }
      })
    },
    onError: (error) => {
      dispatchNotification({
        type: 'notify',
        payload: {
          content: error.response.data.error,
          messageType: 'error'
        }
      })
    }
  })

  // const toggleVisibility = () => {
  //   setVisible(!visible)
  // }

  const addLike = () => {
    handleLike(blog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleDelete(blog.id)
    }
  }

  const handleLike = () => {
    const { user, likes, ...remainder } = blog
    const updatedBlog = { user: blog.user.id, likes: blog.likes + 1, ...remainder }
    updateLikeMutation.mutate(updatedBlog)
  }

  const handleDelete = (blogId) => {
    deleteBlogMutation.mutate({ blogId })
  }

  const handleComment = (event) => {
    event.preventDefault()
    const { user, comments, ...remainder } = blog
    const updatedBlogWithNewComment = {
      user: blog.user.id,
      comments: comments.concat(comment),
      ...remainder
    }
    updateCommentMutation.mutate(updatedBlogWithNewComment)
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog-style">
      <span className="blog-title">{blog.title}</span>
      &nbsp;
      <span className="blog-author">{blog.author}</span>
      {/* <span style={hideWhenVisible}>
        <button className="blog-view" onClick={toggleVisibility}>
          view
        </button>
      </span> */}
      {/* <span style={showWhenVisible}>
        <button className="blog-hide" onClick={toggleVisibility}>
          hide
        </button> */}
      <div>
        <div className="blog-url">{blog.url}</div>
        <span className="blog-likes">{blog.likes}</span>
        <button className="blog-like" onClick={addLike}>
          like
        </button>
        <div className="blog-username">{blog.user.name}</div>
      </div>
      {blog.user.username === userValue.username && (
        <button className="blog-remove" onClick={handleRemove}>
          remove
        </button>
      )}
      <h2>comments</h2>
      <div>
        <form onSubmit={handleComment}>
          <input
            type="text"
            value={comment}
            name="input-blog-comment"
            id="input-blog-comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <input type="submit" value="add comment" />
        </form>
      </div>
      <ul>
        {blog.comments.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      {/* </span> */}
    </div>
  )
}

export default Blog
