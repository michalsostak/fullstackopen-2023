import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import LoggedIn from './components/LoggedIn'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const showNotification = (notificationMessage, notificationType, timeout) => {
    setNotificationType(notificationMessage)
    setNotificationMessage(notificationType)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType('')
    }, timeout)
  }

  const defaultTimeout = 3000

  useEffect(() => {
    (async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (exception) {
        showNotification('error', exception.response.data.error, defaultTimeout)
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          blogService.setToken(user.token)
        }
      } catch (exception) {
        showNotification('error', exception.response.data.error, defaultTimeout)
      }
    })()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('error', exception.response.data.error, defaultTimeout)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
    setBlogs([])
  }

  const noteFormRef = useRef()

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      showNotification('success', `a new blog ${newBlog.title} by ${newBlog.author} added`, defaultTimeout)
      noteFormRef.current.toggleVisibility()
    } catch (exception) {
      showNotification('error', exception.response.data.error, defaultTimeout)
    }
  }

  const addLike = async (blogId, updatedBlog) => {
    const returnedBlog = await blogService.update(blogId, updatedBlog)
    try {
      setBlogs(blogs.map(blog => blog.id !== blogId ? blog : returnedBlog))
      showNotification('success', `like for blog ${returnedBlog.title} are now: ${returnedBlog.likes}`, defaultTimeout)
    } catch (exception) {
      showNotification('error', exception.response.data.error, defaultTimeout)
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      setBlogs(blogs.filter(blog => blog.id !== blogId))
      showNotification('success', `removed blog with id ${blogId}`, defaultTimeout)
    } catch (exception) {
      showNotification('error', exception.response.data.error, defaultTimeout)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notificationMessage} notificationType={notificationType} />
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} notificationType={notificationType} />
      <LoggedIn user={user} handleLogout={handleLogout} />
      <Togglable buttonLabel="create new blog" ref={noteFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <BlogList blogs={blogs} increaseLikes={addLike} user={user} deleteBlog={deleteBlog} />
    </div>
  )
}

export default App