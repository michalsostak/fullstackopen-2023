const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  // eslint-disable-next-line no-unused-vars
  const { _id, __v, url, ...blog } = blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current,
  )
  return blog
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const groupedByAuthor = _.groupBy(blogs, 'author')
  const { key, count } = Object.entries(groupedByAuthor).reduce(
    (max, [key, value]) => {
      const count = value.length
      return count > max.count ? { key, count } : max
    },
    { key: null, count: 0 },
  )
  return { author: key, blogs: count }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const groupedByAuthor = _.groupBy(blogs, 'author')
  const { key, likesSum } = Object.entries(groupedByAuthor).reduce(
    (max, [key, value]) => {
      const likesSum = value.reduce((sum, blog) => sum + blog.likes, 0)
      return likesSum > max.likesSum ? { key, likesSum } : max
    },
    { key: null, likesSum: 0 },
  )
  return { author: key, likes: likesSum }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
