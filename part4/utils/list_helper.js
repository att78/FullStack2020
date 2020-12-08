const { groupBy, maxBy } = require('lodash')
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  // sum asetetaan alussa nollaksi. blog arvo kuvaa kunkin yksittäisen blogin likejen määrää.
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {

  return blogs.reduce((fBlog, blog) => fBlog.likes > blog.likes ? fBlog : blog, {})
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return {}

  return _(blogs)
    .groupBy('author')
    .map((blog, author) => ({ author, blogs: blog.length }))
    .maxBy('blogs')
}

const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return {}

  return _(blogs)
    .groupBy('author')
    .map((blogs, author) => {
      const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
      return ({ author, likes })
    })
    .maxBy('likes')
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}