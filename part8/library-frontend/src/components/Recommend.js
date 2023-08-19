import { useQuery } from '@apollo/client'
import { ALL_BOOKS, USER } from '../queries'
const Recommend = () => {

  const userResult = useQuery(USER)

  let favoriteGenre
  if (userResult?.data?.me?.favoriteGenre) {
    favoriteGenre = userResult?.data?.me?.favoriteGenre
  }

  const result = useQuery(ALL_BOOKS, {
    variables: { 
      genre: favoriteGenre,
    },
  })

  if (result.loading || userResult.loading)  {
    return <div>loading...</div>
  }
 
  const books = result.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
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
    </div>
  )
}

export default Recommend
