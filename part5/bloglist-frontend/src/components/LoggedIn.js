import blogService from '../services/blogs'

function handleLogout(setUser) {
  window.localStorage.removeItem('loggedBlogAppUser')
  blogService.setToken(null)
  setUser(null)
}

const LoggedIn = ({ user, setUser }) => (
  <>
    <p>
      {user.name} logged in
      <button onClick={() => handleLogout(setUser)}>logout</button>
    </p>
  </>
)

export default LoggedIn