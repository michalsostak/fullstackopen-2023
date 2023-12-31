import { useState, useEffect } from 'react'
import { useUserDispatch } from '../UserContext'
import loginService from '../services/login'
import userService from '../services/user'
import { useNotificationDispatch } from '../NotificationContext'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Grid } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatchUser = useUserDispatch()
  const dispatchNotification = useNotificationDispatch()
  const navigate = useNavigate()

  const userData = userService.getUser()

  useEffect(() => {
    if (userData) {
      navigate('/')
    }
  }, [userData, navigate])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })
      userService.setUser(user)
      dispatchUser({
        type: 'login',
        payload: {
          username: user.username,
          name: user.name
        }
      })
      navigate('/')
    } catch (error) {
      dispatchNotification({
        type: 'notify',
        payload: {
          content: error.message,
          messageType: 'error'
        }
      })
    }
  }

  if (userData) {
    return null
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <Grid container direction={'column'} spacing={3}>
          <Grid item>
            <TextField
              label="username"
              type="text"
              value={username}
              id="input-login-username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="password"
              type="password"
              value={password}
              id="input-login-password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              id="input-login-submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default LoginForm
