import { useState } from 'react'

const Anecdote = ({ heading, selector, anecdotes, votes }) => {
  return (
    <>
      <h1>{heading}</h1>
      <p>{anecdotes[selector]}</p>
      <p>Has {votes[selector]} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const getRandomNumberInRangeInclusive = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleVoteClick = () => {
    const votesCopy = [...votes];
    votesCopy[selected]++;
    setVotes(votesCopy)
  }

  const handleNextClick = () => {
    setSelected(getRandomNumberInRangeInclusive(0, anecdotes.length - 1));
  }

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(getRandomNumberInRangeInclusive(0, anecdotes.length - 1))

  const maxValueIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <Anecdote heading={"Anecdote of the day"} selector={selected} anecdotes={anecdotes} votes={votes} />
      <button onClick={handleVoteClick}>Vote</button>
      <button onClick={handleNextClick}>Next Anecdote</button>
      <Anecdote heading={"Anecdote with most votes"} selector={maxValueIndex} anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App
