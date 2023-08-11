import { useUserValue, useUserDispatch } from '../UserContext'
import userService from '../services/user'
import { useQueryClient } from 'react-query'
import { useNavigate, Link } from 'react-router-dom'

const Menu = () => {
  const userValue = useUserValue()
  const dispatchUser = useUserDispatch()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handleLogout = () => {
    userService.clearUser()
    dispatchUser({ type: 'logout' })
    queryClient.clear()
    navigate('/')
  }

  if (!userValue) {
    return null
  }

  return (
    <div>
      <Link to="/blogs">blogs</Link>
      <Link to="/users">users</Link>
      {userValue.username} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Menu
