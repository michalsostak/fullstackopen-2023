import { useLazyQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const [genre, setGenre] = useState(null)
  const [displayedBooks, setDisplayedBooks] = useState([])
  const [bookGenres, setBookGenres] = useState([])
  const [booksByGenre, { loading: booksByGenreLoading, data: booksByGenreData }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (!genre) {
      booksByGenre()
    }
    else {
      booksByGenre({ variables: { genre: genre } })
    }

    const booksResult = booksByGenreData?.allBooks
    if (booksResult !== undefined) {
      setDisplayedBooks(booksByGenreData.allBooks)
    }
    if (booksResult !== undefined && !genre) {
      setBookGenres(booksResult)
    }
  }, [genre, booksByGenreData, booksByGenreLoading, booksByGenre])


  if ((booksByGenreLoading && displayedBooks === undefined)) {
    return <div>loading...</div>
  }

  const allGenres = bookGenres
    .map(book => book.genres)
    .reduce((acc, genres) => [...acc, ...genres], ['all genres'])

  const allGenresUnique = [...new Set(allGenres)]

  const handleGenre = (event) => {
    const genreName = event.target.value === 'all genres' ? null : event.target.value
    setGenre(genreName)
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
          {displayedBooks.map((a) => (
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
