import { useUserValue, useUserDispatch } from '../UserContext'
import userService from '../services/user'
import { useQueryClient } from 'react-query'

const LoggedIn = () => {
  const userValue = useUserValue()
  const dispatchUser = useUserDispatch()
  const queryClient = useQueryClient()

  const handleLogout = () => {
    userService.clearUser()
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
