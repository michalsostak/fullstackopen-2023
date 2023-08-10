import { useEffect, useRef } from 'react'
import userService from './services/user'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import LoggedIn from './components/LoggedIn'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useUserValue, useUserDispatch } from './UserContext'

const App = () => {
  const dispatchUser = useUserDispatch()
  const userValue = useUserValue()

  const blogFormRef = useRef()

  useEffect(() => {
    const user = userService.getUser()
    dispatchUser({ type: 'login', payload: user })
  }, [dispatchUser])

  if (userValue === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <LoggedIn />
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default App
