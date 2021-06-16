const schemas = require('./schemas')

const createComment = async (comment, user, post) => {
  const dbComment = new schemas.Comment({
    ...comment,
    author: user,
    post: post._id,
    seenBy: [],
    edits: []
  })

  await dbComment.save()

  return dbComment
}

const getCommentById = async (commentId) => {
  return schemas.Comment.findById(commentId).populate('author').populate('seenBy')
}

const getPostComments = async (postId) => {
  return schemas.Comment.find({
    post: postId
  }).populate('author').populate('seenBy')
}

const getUserComments = async (user) => {
  return schemas.Comment.find({
    author: user._id
  }).populate('author').populate('seenBy')
}

module.exports = {
  createComment,
  getCommentById,
  getPostComments,
  getUserComments
}
