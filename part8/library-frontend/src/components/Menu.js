import { useApolloClient } from '@apollo/client'
import { Link } from "react-router-dom"

const Menu = ({ token, setToken }) => {
  const client = useApolloClient()
  const padding = {
    paddingRight: 5
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <>
        <Link to="/"><button style={padding} >authors</button></Link>
        <Link to="/books"><button style={padding} >books</button></Link>
        <Link to="/login"><button style={padding} >login</button></Link>
      </>
    )
  }

  return (
    <div>
      <Link to="/"><button style={padding} >authors</button></Link>
      <Link to="/books"><button style={padding} >books</button></Link>
      <Link to="/add"><button style={padding} >add book</button></Link>
      <Link to="/recommend"><button style={padding} >recommend</button></Link>
      <Link to="/"><button style={padding} onClick={logout} >logout</button></Link>
    </div>
  )
}

export default Menu