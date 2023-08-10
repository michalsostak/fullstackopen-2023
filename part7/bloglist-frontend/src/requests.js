import axios from 'axios'
import blogService from './services/blogs'

const baseUrl = '/api/blogs'

export const getAllBlogs = () => axios.get(baseUrl).then((res) => res.data)

export const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: blogService.getToken() }
  }
  return axios.post(baseUrl, newBlog, config).then((res) => res.data)
}

export const updateBlog = async (updatedBlog) => {
  const config = {
    headers: { Authorization: blogService.getToken() }
  }
  return axios
    .put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
    .then((response) => response.data)
}

export const deleteBlog = async ({ blogId }) => {
  const config = {
    headers: { Authorization: blogService.getToken() }
  }
  return axios
    .delete(`${baseUrl}/${blogId}`, config)
    .then((response) => response.data)
}
