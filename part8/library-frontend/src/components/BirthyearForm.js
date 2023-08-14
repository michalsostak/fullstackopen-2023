import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const BirthyearForm = ({ authors }) => {
  const [name, setName] = useState(authors.length > 0 ? authors[0].name : '')
  const [born, setBorn] = useState('')


  const [changeBorn] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })


  const submit = (event) => {
    event.preventDefault()

    changeBorn({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <select value={name} onChange={e => setName(e.target.value)}>
          {authors.map((author) =>
            <option key={author.id} value={author.name}>{author.name}</option>
          )}
        </select>
        <div>
          born <input
            value={born}
            type="number"
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthyearForm