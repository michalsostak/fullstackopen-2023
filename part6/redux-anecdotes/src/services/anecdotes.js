import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content: content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const incrementVote = async (anecdote) => {
  const updatedAnecdote = { content: anecdote.content, votes: anecdote.votes + 1, id: anecdote.id }
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote)
  return response.data
}

export default { getAll, createNew, incrementVote }