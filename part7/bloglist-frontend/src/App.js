import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import LoggedIn from './components/LoggedIn'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useNotificationDispatch } from './NotificationContext'
import { useUserValue, useUserDispatch } from './UserContext'

const App = () => {
  const dispatchNotification = useNotificationDispatch()
  const dispatchUser = useUserDispatch()
  const userValue = useUserValue()

  const blogFormRef = useRef()

  useEffect(() => {
    ;(async () => {
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          blogService.setToken(user.token)
          dispatchUser({
            type: 'login',
            payload: user
          })
        }
      } catch (exception) {
        dispatchNotification({
          type: 'notify',
          payload: {
            content: exception.message,
            messageType: 'error'
          }
        })
      }
    })()
  }, [dispatchNotification, dispatchUser])

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
