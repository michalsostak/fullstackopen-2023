import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword
}) => (
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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm
