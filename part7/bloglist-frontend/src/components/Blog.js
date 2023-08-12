import { useState } from 'react'
import { useUserValue } from '../UserContext'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'
import { updateBlog, deleteBlog } from '../requests-blogs'
import { useNavigate } from 'react-router-dom'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
  List,
  ListItem,
  Typography
} from '@mui/material'

const Blog = ({ blog }) => {
  const [comment, setComment] = useState('')
  const queryClient = useQueryClient()
  const userValue = useUserValue()
  const dispatchNotification = useNotificationDispatch()
  const navigate = useNavigate()

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
      setComment('')
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
      navigate('/blogs')
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
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>{blog.title}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Author</TableCell>
              <TableCell>{blog.author}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Url</TableCell>
              <TableCell>{blog.url}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Likes</TableCell>
              <TableCell>{blog.likes}</TableCell>
              <TableCell>
                <Button variant="contained" onClick={addLike}>
                  like
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Creator</TableCell>
              <TableCell>{blog.user.name}</TableCell>
              <TableCell>
                {blog.user.username === userValue.username && (
                  <Button variant="contained" onClick={handleRemove}>
                    remove
                  </Button>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={5}>
        <Typography variant="h6">Comments</Typography>
      </Box>
      <div>
        <form onSubmit={handleComment}>
          <TextField
            type="text"
            value={comment}
            name="input-blog-comment"
            id="input-blog-comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <Box spacing={5} mt={3}>
            <Button type="submit" variant="contained">
              Add comment
            </Button>
          </Box>
        </form>
      </div>
      <List>
        {blog.comments.map((c) => (
          <ListItem key={c}>{c}</ListItem>
        ))}
      </List>
    </div>
  )
}

export default Blog
