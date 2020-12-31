import React, { useState } from 'react'


const Blog = ({ user, blog, blogs, blogService, setBlogs }) => {

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


  return (
    <div style={blogStyle} className='blog'>
      <div>Blog's name: {blog.title} Blog's writer: {blog.author}
        <button onClick={() => toggleVisibility()}>show/hide</button>
      </div>
      {visible ? (<div><p>Find blog from: {blog.url}</p>
        <p>{blog.likes} likes <button onClick={() => handleLikeClick()}>like</button></p>
      </div>) : (<div />)}
    </div>

  )




}

export default Blog
