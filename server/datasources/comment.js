const daos = require('./daos')

const createComment = async (comment, user) => {
  const dbComment = new daos.Comment({
    author: user,
    text: comment.text,
    post: comment.post
  })

  await dbComment.save()

  return dbComment
}

const getPostComments = async (postId) => {
  const comments = await daos.Comment.find({
    post: postId
  }).populate('author')

  return comments
}

const getCommentById = async (id) => {
  return daos.Comment.findById(id).populate('author')
}

const getUserComments = async (user) => {
  console.log('user: ', user)
  return daos.Comment.find({
    author: user
  }).populate('author')
}

const deleteComment = async (id) => {
  return daos.Comment.findByIdAndDelete(id)
}

module.exports = {
  createComment,
  getPostComments,
  getCommentById,
  getUserComments,
  deleteComment,
  Comment: daos.Comment
}
