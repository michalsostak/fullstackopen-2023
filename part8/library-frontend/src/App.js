import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Recommend from './components/Recommend'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

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
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/login" element={<LoginForm setToken={setToken} setError={notify} />} />
        <Route path="/" element={<Authors token={token} />} />
      </Routes>
    </div>
  )
}

export default App
