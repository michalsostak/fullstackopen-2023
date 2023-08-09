const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const newBlog = {
  title: 'Computer Science I',
  author: 'Chris Bourke',
  url: 'https://cse.unl.edu/~cbourke/ComputerScienceOne.pdf',
  likes: 4,
}

const newUser = {
  username: 'testUser',
  name: 'Jon Doe',
  password: 'testPassword',
}

const secondaryUser = {
  username: 'secondUser',
  name: 'Jane Doe',
  password: 'testPasswordSecond',
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const createUser = async (userDetails) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(userDetails.password, saltRounds)

  const user = new User({
    username: userDetails.username,
    name: userDetails.name,
    passwordHash: passwordHash,
  })

  return await user.save()
}

const getUserToken = async (userDetails) => {
  const user = await User.findOne({
    username: userDetails.username,
  })
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })

  return token
}

const insertBlogsWithUser = async (userDetails) => {
  await createUser(userDetails)

  const userForBlogs = await User.findOne({ username: userDetails.username })
  await Promise.all(
    initialBlogs.map(async (blog) => {
      const blogWihUser = new Blog({ ...blog, user: userForBlogs._id })
      const savedBlog = await blogWihUser.save()
      userForBlogs.blogs = userForBlogs.blogs.concat(savedBlog._id)
    }),
  )

  return await userForBlogs.save()
}

module.exports = {
  initialBlogs,
  blogsInDb,
  newBlog,
  nonExistingId,
  usersInDb,
  newUser,
  createUser,
  getUserToken,
  insertBlogsWithUser,
  secondaryUser,
}
