import { useUserValue, useUserDispatch } from '../UserContext'
import userService from '../services/user'
import { useQueryClient } from 'react-query'
import { useNavigate, Link } from 'react-router-dom'
import { Button, AppBar, Toolbar } from '@mui/material'

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
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/blogs">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          logout
        </Button>
        <em>{userValue.name} logged in</em>
        <Button color="primary" onClick={handleLogout}>
          logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
