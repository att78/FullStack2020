import React from 'react'

const BlogForm = ({ newUrl, handleUrl, handleHeader, newHeader, addBlog, newAuthor, handleAuthor }) => (
  <div>
    <h3>Add new blog</h3>
    <div>
      <form onSubmit={addBlog}>
        <div>
          Header of the blog:
        <input
            type="text"
            value={newHeader}
            onChange={handleHeader}
          />
        </div>
        <div>
          Author of the blog:
        <input
            type="text"
            value={newAuthor}
            onChange={handleAuthor}
          />
        </div>
        <div>
          Blog url:
        <input
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

export default BlogForm