import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'
import  Anecdote  from './Anecdote'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const handleVote = async (anecdote) => {
    await anecdoteService.incrementVote(anecdote)
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`You voted '${anecdote.content}'`))
    setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
  }

  return (
    <>
      {anecdotes
        .sort((a, b) => a.votes > b.votes ? 1 : -1)
        .reverse()
        .map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => handleVote(anecdote)} />
        )}
    </>
  )
}

export default AnecdoteList