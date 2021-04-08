const express = require('express')

const datasources = require('../datasources')
const auth = require('../helpers/auth')
const router = express.Router()
const mappers = require('../helpers/mappers')

// add comment to post
router.post('/:postId',
  auth.verifyToken,
  datasources.user.User.verify,
  async (req, res) => {
    const { body, user, params } = req

    const post = await datasources.post.getPostById(params.postId)

    if (!post) {
      res.status(404)

      return res.send({
        err: 'Post not found'
      })
    }

    const commentData = {
      text: body.text,
      post
    }

    const comment = await datasources.comment.createComment(commentData, user)

    post.comments.push(comment)

    await post.save()

    return res.send(mappers.mapComment(comment))
  }
)

// get comments for post
router.get('/post/:postId',
  auth.verifyToken,
  datasources.user.User.verify,
  async (req, res) => {
    const { params } = req
    const comments = await datasources.comment.getPostComments(params.postId)

    return res.send(comments.map(mappers.mapComment))
  }
)

// get user comments
router.get('/user',
  auth.verifyToken,
  datasources.user.User.verify,
  async (req, res) => {
    const { user } = req
    const comments = await datasources.comment.getUserComments(user)

    return res.send(comments.map(mappers.mapComment))
  }
)

// get comment by id
router.get('/:commentId',
  auth.verifyToken,
  datasources.user.User.verify,
  async (req, res) => {
    const { params } = req

    const comment = await datasources.comment.getCommentById(params.commentId)

    if (!comment) {
      res.status(404)

      res.send({
        err: 'Comment not found'
      })
    }

    return res.send(mappers.mapComment(comment))
  }
)

module.exports = router
