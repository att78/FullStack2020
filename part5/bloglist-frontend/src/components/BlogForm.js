import React, { useState } from 'react'

const BlogForm = ({ createBlog, setNotification }) => {

  const [newHeader, setNewHeader] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')

  const handleUrl = (event) => {
    setNewUrl(event.target.value)
  }
  const handleAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleHeader = (event) => {
    setNewHeader(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      createBlog({
        author: newAuthor,
        title: newHeader,
        url: newUrl,
        likes: 0,
      })

      setNewHeader('')
      setNewAuthor('')
      setNewUrl('')
      /*
      await blogService.create(blogAdd)
      setNotification('New blog added')
      setTimeout(() => {
        setNotification(null)
      }, 5000)*/

    } catch (exception) {
      setNotification('Blog information was not valid')
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    }
  }


  return (
    <div>
      <h3>Add new blog</h3>
      <div>
        <form onSubmit={addBlog}>
          <div>
            Header of the blog:
        <input
              id='title'
              type="text"
              value={newHeader}
              onChange={handleHeader}
            />
          </div>
          <div>
            Author of the blog:
        <input
              id='author'
              type="text"
              value={newAuthor}
              onChange={handleAuthor}
            />
          </div>
          <div>
            Blog url:
        <input
              id='url'
              type="text"
              value={newUrl}
              onChange={handleUrl}
            />
          </div>
          <button type="submit">add new blog</button>

        </form>

      </div>

    </div>
  )


}

export default BlogForm