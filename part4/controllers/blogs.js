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


/*
blogsRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
*/
/*
blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    author: body.author,
    title: body.title,
    likes: body.likes,
    url: body.url
  })

  blog.save()
    .then(savedBlog => {
      response.json(savedBlog.toJSON())
    })
    .catch(error => next(error))
})
*/

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  /*
  const saved_blog = await blog.save()*/
  if (request.body.likes === undefined) {
    blog.likes = 0
  }
  const saved_blog = await blog.save()
  response.json(saved_blog)
})




module.exports = blogsRouter
