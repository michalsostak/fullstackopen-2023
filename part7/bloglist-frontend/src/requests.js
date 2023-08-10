import axios from 'axios'
const baseUrl = '/api/blogs'
import userService from './services/user'

const headers = {
  Authorization: userService.getUser()
    ? `Bearer ${userService.getUser().token}`
    : null
}

export const getAllBlogs = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

export const createBlog = async (newBlog) => {
  const request = await axios.post(baseUrl, newBlog, { headers })
  return request.data
}

export const updateBlog = async (updatedBlog) => {
  const request = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, {
    headers
  })
  return request.data
}

export const deleteBlog = async ({ blogId }) => {
  await axios.delete(`${baseUrl}/${blogId}`, { headers })
}
