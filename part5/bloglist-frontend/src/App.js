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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
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
      setNotificationType('error')
      setNotificationMessage(exception.response.data.error)
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType('')
      }, 5000)
    }
  }

  const noteFormRef = useRef()

  const addBlog = (newBlog) => {
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotificationType('success')
        setNotificationMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
        noteFormRef.current.toggleVisibility()
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationType('')
        }, 5000)
      })
      .catch(e => {
        setNotificationType('error')
        setNotificationMessage(e.response.data.error)
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationType('')
        }, 5000)
      })
  }

  const addLike = (blogId, updatedBlog) => {
    blogService
      .update(blogId, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== blogId ? blog : returnedBlog))
        setNotificationType('success')
        setNotificationMessage(`like for blog ${returnedBlog.title} are now: ${returnedBlog.likes}`)
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationType('')
        }, 5000)
      })
      .catch(e => {
        setNotificationType('error')
        setNotificationMessage(e.response.data.error)
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationType('')
        }, 5000)
      })
  }

  const deleteBlog = (blogId) => {
    blogService
      .remove(blogId)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== blogId))
        setNotificationType('success')
        setNotificationMessage(`removed blog with id ${blogId}`)
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationType('')
        }, 5000)
      })
      .catch(e => {
        setNotificationType('error')
        setNotificationMessage(e.response.data.error)
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationType('')
        }, 5000)
      })

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
      <LoggedIn user={user} setUser={setUser} />
      <Togglable buttonLabel="create new blog" ref={noteFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <BlogList blogs={blogs} increaseLikes={addLike} user={user} deleteBlog={deleteBlog} />
    </div>
  )
}

export default App