import axios from 'axios'
const baseUrl = '/api/users'

export const getAllUsers = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}
