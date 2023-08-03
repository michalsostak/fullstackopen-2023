import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return (
    <>
      {anecdotes
        .sort((a, b) => a.votes > b.votes ? 1 : -1)
        .reverse()
        .map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => dispatch(vote(anecdote.id))} />
        )}
    </>
  )
}

export default AnecdoteList