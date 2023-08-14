import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Menu from './components/Menu'
import { Routes, Route } from 'react-router-dom'

const App = () => {

  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/" element={<Authors />} />
      </Routes>
    </div>
  )
}

export default App
