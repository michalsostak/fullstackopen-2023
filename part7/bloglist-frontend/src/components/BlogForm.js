import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'
import { createBlog } from '../requests'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

  const handleCreate = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    createBlogMutation.mutate(newBlog)
  }

  const createBlogMutation = useMutation(createBlog, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
      dispatchNotification({
        type: 'notify',
        payload: {
          content: `a new blog ${newBlog.title} by ${newBlog.author} added`,
          messageType: 'success'
        }
      })
      blogFormRef.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
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

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="input-blog-title"
            id="input-blog-title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="input-blog-author"
            id="input-blog-author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="input-blog-url"
            id="input-blog-url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <input
          type="submit"
          value="create"
          name="input-blog-create"
          id="input-blog-create"
        />
      </form>
    </div>
  )
}

export default BlogForm
