import axios from 'axios'
import userService from '../services/user'
const baseUrl = '/api/blogs'

const headers = {
  Authorization: userService.getUser()
    ? `Bearer ${userService.getUser().token}`
    : null
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObject) => {
  const request = await axios.post(baseUrl, newObject, { headers })
  return request.data
}

const update = async (id, updatedObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, updatedObject, { headers })
  return request.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers })
}

export default { getAll, create, update, remove }
