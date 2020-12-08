const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  // sum asetetaan alussa nollaksi. blog arvo kuvaa kunkin yksittäisen blogin likejen määrää.
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const mostLikedBlog = (blogs) => {

  return blogs.reduce((fBlog, blog) => fBlog.likes > blog.likes ? fBlog : blog, {})
}


module.exports = {
  dummy,
  totalLikes,
  mostLikedBlog
}