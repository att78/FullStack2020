const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

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
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blogs => blogs.toJSON()))
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


blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  /*
  const saved_blog = await blog.save()*/
  if (request.body.likes === undefined) {
    blog.likes = 0
  }

  if (request.body.url === undefined || request.body.title === undefined) {
    response.status(400).end()
  } else {

    const saved_blog = await blog.save()
    response.json(saved_blog)
  }
})




module.exports = blogsRouter
