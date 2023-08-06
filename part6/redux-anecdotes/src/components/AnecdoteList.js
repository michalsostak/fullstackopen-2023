import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import  Anecdote  from './Anecdote'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const handleVote = async (anecdote) => {
    dispatch(voteForAnecdote(anecdote))
    dispatch(setNotification(`you voted for: '${anecdote.content}'`, 2))
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