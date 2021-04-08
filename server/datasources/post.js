const daos = require('./daos')

const createPost = async (post, user) => {
  const dbPost = new daos.Post({
    author: user,
    text: post.text,
    book: post.book.toObject()
  })

  await dbPost.save()

  return dbPost
}

const getBookPosts = async (bookId) => {
  const posts = await daos.Post.find({
    book: bookId
  }).populate('author')

  return posts
}

const getPostById = async (id) => {
  return daos.Post.findById(id).populate('author').populate('comments')
}

const getUserPosts = async (user) => {
  return daos.Post.find({
    author: user
  }).populate('author')
}

const deletePost = async (id) => {
  return daos.Post.findByIdAndDelete(id)
}

module.exports = {
  createPost,
  getPostById,
  getUserPosts,
  getBookPosts,
  deletePost,
  Post: daos.Post
}
