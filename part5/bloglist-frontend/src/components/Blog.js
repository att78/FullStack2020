import React, { useState } from 'react'


const Blog = ({ user, blog, blogs, blogService, setBlogs, setNotification }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  const handleLikeClick = async () => {
    blog.likes++
    const updated_blog = {
      user: user._id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
      url: blog.url
    }
    await blogService.update(blog.id, updated_blog)
    setBlogs(blogs.map(originalBlog => originalBlog.id === blog.id ? blog : originalBlog))
  }

  const handleDelete = () => {
    console.log('deleting a blog', blog.id)

    const title = blog.title
    const author = blog.author
    if (window.confirm(`Do you want to remove blog ${title} by ${author}?`)) {
      removeBlog(blog)
    }
  }

  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
      const remainingBlogs = blogs.filter(p => p.id !== blog.id)
      setBlogs(remainingBlogs)

    } catch (exception) {
      setNotification('Removing blog failed.')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    setNotification('A blog was removed successfully.')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }


  return (
    <div style={blogStyle} className='blog'>
      <div>Blog's name: {blog.title} Blog's writer: {blog.author}
        <p>   </p>
        <button onClick={() => toggleVisibility()}>show/hide</button>
      </div>
      {visible ? (<div><p>Find blog from: {blog.url}</p>
        <p>{blog.likes} likes <button onClick={() => handleLikeClick()}>like</button></p>
        <p><button onClick={() => handleDelete()}>delete blog</button></p>
      </div>) : (<div />)}
    </div>

  )




}

export default Blog
