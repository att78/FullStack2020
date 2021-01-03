import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'




test('renders content', () => {
  const blog = {
    title: 'Test',
    author: 'Test Author',
    likes: 'blog.likes',
    url: 'www.testi.fi'
  }

  const component = render(
    <Blog blog={blog} />
  )


  expect(component.container).toHaveTextContent(
    "Blog's name: Test Blog's writer: Test Author"
  )
  expect(component.container).not.toHaveTextContent('Find blog from: ', 'likes')
})


test('click-test for like and url', () => {
  const blog = {
    title: 'Test',
    author: 'Test Author',
    likes: 'blog.likes',
    url: 'www.testi.fi'
  }

  // user for mocking
  const user = {
    _id: '123456',
    username: 'Mock',
    name: 'Mock',
  }


  const mockHandler = jest.fn()

  // you cannot use mockHandler as a function to mock original blogService, because the original blogService is an object that has function within
  //therefore you have to create blogService object, that has mocked update field.
  const blogService = {
    update: mockHandler
  }
  // create blogs array that has one item in.
  const blogs = [blog]

  const component = render(
    <Blog blog={blog} blogService={blogService} user={user} setBlogs={jest.fn()} blogs={blogs} />
  )

  const button = component.getByText('show/hide')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'Find blog from:'
  )

})

test('click-test for amount of likes', () => {
  const blog = {
    title: 'Test',
    author: 'Test Author',
    likes: 'blog.likes',
    url: 'www.testi.fi'
  }

  // user for mocking
  const user = {
    _id: '123456',
    username: 'Mock',
    name: 'Mock',
  }


  const mockHandler = jest.fn()

  // you cannot use mockHandler as a function to mock original blogService, because the original blogService is an object that has function within
  //therefore you have to create blogService object, that has mocked update field.
  const blogService = {
    update: mockHandler
  }
  // create blogs array that has one item in.
  const blogs = [blog]

  const component = render(
    <Blog blog={blog} blogService={blogService} user={user} setBlogs={jest.fn()} blogs={blogs} />
  )

  const button = component.getByText('show/hide')
  fireEvent.click(button)

  const likeButton = component.getByText('like')

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})



