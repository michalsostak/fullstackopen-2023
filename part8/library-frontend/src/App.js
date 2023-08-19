import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Recommend from './components/Recommend'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same book twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  try {
    cache.updateQuery(query, (data) => {
      // if query is not cached yet, do nothing
      if (!data) {
        return
      }
      return {
        allBooks: uniqByName(data.allBooks.concat(addedBook)),
      }
    })
  }
  catch (error) {
    console.log('query of this type does not yet exist in the cache...', error)
  }

}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      
      // updating each individual sub-cache because each query ,eg. ALL_BOOKS{ genre: 'drama' }
      //  has its own cache with results
      addedBook.genres.map((genre) => 
      updateCache(client.cache, { query: ALL_BOOKS, variables: { genre: genre } }, addedBook))
    },
  })

  useEffect(() => {
    const localToken = localStorage.getItem('libraryapp-user-token')
    if (!token && localToken !== null) {
      setToken(localToken)
    }
  }, [token])

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <Menu token={token} setToken={setToken} />
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook notify={notify} />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/login" element={<LoginForm setToken={setToken} notify={notify} />} />
        <Route path="/" element={<Authors token={token} />} />
      </Routes>
    </div>
  )
}

export default App
