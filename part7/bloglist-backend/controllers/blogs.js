const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = request.user

  const blog = new Blog({ ...request.body, user: user._id })
  const savedBlog = await blog.save()
  savedBlog.populate('user', { username: 1, name: 1, id: 1 })

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.post(
  '/:id/comments',
  middleware.userExtractor,
  async (request, response) => {
    const newComment = request.body
    const updatedBlogWithNewComment = await Blog.findByIdAndUpdate(
      request.params.id,
      newComment,
      { $push: { comments: newComment } },
      { new: true },
    ).populate('user', { username: 1, name: 1, id: 1 })

    response.json(updatedBlogWithNewComment).status(200).end()
  },
)

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const userMatch = user.blogs.filter(
    (blogid) => blogid.toString() === request.params.id,
  )

  if (!userMatch || userMatch.length === 0) {
    return response
      .status(403)
      .json({ error: 'User does not have permission to delete this blog' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  }).populate('user', { username: 1, name: 1, id: 1 })

  response.json(updatedBlog).status(200).end()
})

module.exports = blogsRouter
