const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initial_blogs)
})

test('all blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('All blogs have returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initial_blogs.length)
})

test('Blog has identification field "id" ', async () => {
  const response = await api.get('/api/blogs')
  first_blog = response.body[0]
  expect(first_blog.id).toBeDefined()
})



afterAll(() => {
  mongoose.connection.close()
})