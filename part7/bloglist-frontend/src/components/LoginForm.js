import { useState } from 'react'
import { useUserDispatch } from '../UserContext'
import loginService from '../services/login'
import userService from '../services/user'
import { useNotificationDispatch } from '../NotificationContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatchUser = useUserDispatch()
  const dispatchNotification = useNotificationDispatch()

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
          username: username,
          password: password
        }
      })
    } catch (error) {
      dispatchNotification({
        type: 'notify',
        payload: {
          content: error.response.data.error,
          messageType: 'error'
        }
      })
    }
  }

  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            id="input-login-username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            id="input-login-password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <input type="submit" value="login" id="input-login-submit" />
      </form>
    </>
  )
}

export default LoginForm
