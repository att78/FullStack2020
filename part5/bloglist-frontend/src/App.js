import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newHeader, setNewHeader] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [notification, setNotification] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Wrong username or password. Please try again.')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)

  }

  const handleUrl = (event) => {
    setNewUrl(event.target.value)
  }
  const handleAuthor = (event) => {
    setNewAuthor(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleHeader = (event) => {
    setNewHeader(event.target.value)
  }
  const handleName = (event) => {
    setUsername(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogAdd = {
        author: newAuthor,
        title: newHeader,
        url: newUrl,
        likes: 0,
        user: user.id
      }
      await blogService.create(blogAdd)
      setNotification('New blog added')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification('Blog information was not valid')
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    }
  }


  if (user === null) {
    return (
      <div>
        <Message notification={notification} />
        <LoginForm
          username={username}
          password={password}
          handleName={handleName}
          handlePassword={handlePassword}
          handleLogin={handleLogin} />
      </div>
    )
  }

  return (

    <div>
      <p>{user.name} is currently logged in </p>
      <button onClick={handleLogout}>logout</button>
      <Message notification={notification} />

      <h2>blogs</h2>
      <BlogForm
        handleAuthor={handleAuthor}
        handleHeader={handleHeader}
        handleUrl={handleUrl}
        addBlog={addBlog}
        newAuthor={newAuthor}
        newUrl={newUrl}
        newHeader={newHeader}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App