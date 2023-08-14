import { Link } from "react-router-dom"

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to="/"><button style={padding} >authors</button></Link>
      <Link to="/books"><button style={padding} >books</button></Link>
      <Link to="/add"><button style={padding} >add book</button></Link>
    </div>
  )
}

export default Menu