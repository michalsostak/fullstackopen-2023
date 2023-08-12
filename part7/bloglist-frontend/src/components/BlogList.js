import { useQuery } from 'react-query'
import { getAllBlogs } from '../requests-blogs'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  Typography
} from '@mui/material'

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
      <Typography variant="h5">List of blogs</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Created by</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs
              .sort((a, b) => (a.likes > b.likes ? 1 : -1))
              .reverse()
              .map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>{blog.author}</Link>
                  </TableCell>
                  <TableCell>{blog.user.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList
