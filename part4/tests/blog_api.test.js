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

test('Blog can be added to blogs', async () => {

  const add_blog = {
    author: 'Elf',
    title: 'Christmas Evening',
    likes: 10,
    url: 'www.yle.fi'
  }

  await api
    .post('/api/blogs')
    .send(add_blog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const authors = response.body.map(b => b.author)
  expect(response.body).toHaveLength(helper.initial_blogs.length + 1)
  expect(authors).toContain('Elf')
})

test('If blog has no likes, likes is set to zero', async () => {
  const add_blog = {
    author: 'Elf and the cat',
    title: 'Christmas Night',
    url: 'www.yle.fi'
  }

  await api
    .post('/api/blogs')
    .send(add_blog)
    .expect(200)

  const blogs = await helper.blogs_in_db()
  expect(blogs[blogs.length - 1].likes).toBe(0)
})

test('if blog has no url, it cannot be added', async () => {
  const add_blog = {
    author: 'Elf',
    title: 'Christmas Evening',
    likes: 10

  }

  await api
    .post('/api/blogs')
    .send(add_blog)
    .expect(400)

  const blogs = await helper.blogs_in_db()
  expect(blogs).toHaveLength(helper.initial_blogs.length)

})

test('if blog has no title, it cannot be added', async () => {
  const add_blog = {
    author: 'Elf',
    likes: 10,
    url: 'www.yle.fi'
  }

  await api
    .post('/api/blogs')
    .send(add_blog)
    .expect(400)

  const blogs = await helper.blogs_in_db()
  expect(blogs).toHaveLength(helper.initial_blogs.length)
})


test('deletion of a blog succeeds with status code 204 if id is valid', async () => {
  const blogs_at_start = await helper.blogs_in_db()
  const blog_to_delete = blogs_at_start[0]


  await api
    .delete(`/api/blogs/${blog_to_delete.id}`)
    .expect(204)

  const blogs_at_end = await helper.blogs_in_db()
  expect(blogs_at_end).toHaveLength(helper.initial_blogs.length - 1)

  const titles = blogs_at_end.map(r => r.title)
  const authors = blogs_at_end.map(r => r.author)
  expect(titles).not.toContain(blog_to_delete.title)
  expect(authors).not.toContain(blog_to_delete.author)
})

test('updating of a blog succeeds with valid info', async () => {
  const blogs_at_start = await helper.blogs_in_db()
  const blog_to_update = blogs_at_start[0]

  const updated_blog = {
    author: 'Two Elves',
    title: 'Christmas Day',
    likes: 10,
    url: 'www.yle.fi'
  }
  /*
  console.log('likes: ' + updated_blog.likes)
  */
  const sent_blog = await api
    .put(`/api/blogs/${blog_to_update.id}`)
    .send(updated_blog)
    .expect(200)

  const blogs_at_end = await helper.blogs_in_db()
  expect(blogs_at_end).toHaveLength(helper.initial_blogs.length)

  const titles = blogs_at_end.map(r => r.title)
  const authors = blogs_at_end.map(r => r.author)

  expect(titles).toContain(updated_blog.title)
  expect(authors).toContain(updated_blog.author)

})


afterAll(() => {
  mongoose.connection.close()
})