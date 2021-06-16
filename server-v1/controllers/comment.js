const datasources = require('../datasources')

const createComment = async (req, res, next) => {
  const { user, body, params } = req

  const post = await datasources.post.getPostById(params.postId)

  const commentParams = {
    text: body.text
  }

  const savedComment = await datasources.comment.createComment(commentParams, user, post)

  await datasources.post.addCommentToPost(post._id, savedComment)

  req.comment = savedComment

  next()
}

const getCommentById = async (req, rex, next) => {
  const { params } = req

  const comment = await datasources.comment.getCommentById(params.commentId)

  req.comment = comment

  next()
}

const getPostComments = async (req, res, next) => {
  const { params } = req

  const comments = await datasources.comment.getPostComments(params.postId)

  req.comments = comments

  next()
}

const getUserComments = async (req, res, next) => {
  const { user } = req

  const comments = await datasources.comment.getUserComments(user)

  req.comments = comments

  next()
}

module.exports = {
  createComment,
  getCommentById,
  getPostComments,
  getUserComments
}
