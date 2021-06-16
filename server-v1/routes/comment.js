const express = require('express')
const asyncHandler = require('express-async-handler')
const auth = require('../helpers/auth')
const datasourceSchemas = require('../datasources/schemas')

const { createComment, getCommentById, getPostComments, getUserComments } = require('../controllers/comment')

const router = express.Router()

// Create comment
router.post('/:postId',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  asyncHandler(createComment),
  (req, res) => res.send(req.comment)
)

// Get user comments
router.get('/user',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  asyncHandler(getUserComments),
  (req, res) => res.send(req.comments)
)

// Get Comment by Id
router.get('/:commentId',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  asyncHandler(getCommentById),
  (req, res) => res.send(req.comment)
)

// Get Post Comments
router.get('/post/:postId',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  asyncHandler(getPostComments),
  (req, res) => res.send(req.comments)
)

module.exports = router
