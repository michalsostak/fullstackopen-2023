import { useEffect } from 'react'
import userService from './services/user'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'
import Header from './components/Header'
import { useQuery } from 'react-query'
import { useUserValue, useUserDispatch } from './UserContext'
import { Routes, Route, Navigate, useMatch } from 'react-router-dom'
import { getAllUsers } from './requests-users'
import { getAllBlogs } from './requests-blogs'
import { Container } from '@mui/material'

const App = () => {
  const dispatchUser = useUserDispatch()
  const userValue = useUserValue()
  const usersData = useQuery('users', getAllUsers)
  const blogsData = useQuery('blogs', getAllBlogs)

  const matchUser = useMatch('/users/:id')
  const user =
    matchUser && usersData.isSuccess
      ? usersData.data.find((u) => u.id === matchUser.params.id)
      : null

  const matchBlog = useMatch('/blogs/:id')
  const blog =
    matchBlog && blogsData.isSuccess
      ? blogsData.data.find((b) => b.id === matchBlog.params.id)
      : null

  useEffect(() => {
    const user = userService.getUser()
    dispatchUser({ type: 'login', payload: user })
  }, [dispatchUser])

  return (
    <Container>
      <Notification />
      <Menu />
      <Header />
      <Routes>
        <Route
          path="/"
          element={userValue ? <BlogList /> : <Navigate replace to="/login" />}
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        <Route path="/blogs" element={<BlogList />} />
      </Routes>
    </Container>
  )
}

export default App
