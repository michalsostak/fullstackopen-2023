import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({ blogs, setBlogs, setNotificationMessage, setNotificationType }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        setNotificationType('success')
        setNotificationMessage(`a new blog ${title} by ${title} added`)
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
      }
      )
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlog