import { useUserValue, useUserDispatch } from '../UserContext'
import blogService from '../services/blogs'
import { useQueryClient } from 'react-query'

const LoggedIn = () => {
  const userValue = useUserValue()
  const dispatchUser = useUserDispatch()
  const queryClient = useQueryClient()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    dispatchUser({ type: 'logout' })
    queryClient.clear('blogs')
  }

  return (
    <>
      <p>
        {userValue.username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
    </>
  )
}

export default LoggedIn
