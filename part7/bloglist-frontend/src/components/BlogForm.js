import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'
import { createBlog } from '../requests-blogs'
import { TextField, Grid, Typography, Button } from '@mui/material'

const BlogForm = () => {
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
      <Typography variant="h5">Create new</Typography>
      <form onSubmit={handleCreate}>
        <Grid container direction={'column'} spacing={2}>
          <Grid item>
            <TextField
              label="title"
              type="text"
              value={title}
              name="input-blog-title"
              id="input-blog-title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="author"
              type="text"
              value={author}
              name="input-blog-author"
              id="input-blog-author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="url"
              type="text"
              value={url}
              name="input-blog-url"
              id="input-blog-url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              type="submit"
              name="input-blog-create"
              id="input-blog-create"
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default BlogForm
