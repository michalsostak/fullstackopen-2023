import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const [genre, setGenre] = useState(null)

  const result = useQuery(ALL_BOOKS, {
    variables: { 
      genre: genre === 'all genres' ? null : genre,
    },
  })
  const allGenresResult = useQuery(ALL_BOOKS)

  if (result.loading || allGenresResult.loading) {
    return <div>loading...</div>
  }
  console.log(result)
  const books = result.data.allBooks

  const allGenres = allGenresResult.data.allBooks
    .map(book => book.genres)
    .reduce((acc, genres) => [...acc, ...genres], ['all genres'])
  const allGenresUnique = [...new Set(allGenres)]

  const handleGenre = (event) => {
    setGenre(event.target.value)
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{genre ? genre : 'all genres'}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allGenresUnique.map(g => <button key={g} value={g} onClick={handleGenre}>{g}</button>)}
      </div>

    </div>
  )
}

export default Books
