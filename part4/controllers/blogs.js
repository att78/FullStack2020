const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


/*
blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(blog => blog.toJSON()))
    })
    .catch(error => next(error))
})
*/
blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blogs => blogs.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()

})


blogsRouter.put('/:id', async (request, response) => {

  const blog = {
    author: request.body.author,
    title: request.body.title,
    likes: request.body.likes,
    url: request.body.url
  }
  const updated_blog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updated_blog.toJSON())
  /*
    blog.save()
      .then(savedBlog => {
        response.json(savedBlog.toJSON())
      })
      .catch(error => next(error))
      */
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}



blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (request.body.likes === undefined) {
    blog.likes = 0
  }

  if (request.body.url === undefined || request.body.title === undefined) {
    response.status(400).end()
  } else {

    const blog = new Blog({
      author: body.author,
      title: body.title,
      likes: body.likes,
      url: body.url,
      user: user._id
    })

    const saved_blog = await blog.save()
    user.blogs = user.blogs.concat(saved_blog._id)
    await user.save()

    response.json(saved_blog)
  }
})


module.exports = blogsRouter
