const express = require('express')
const asyncHandler = require('express-async-handler')
const auth = require('../helpers/auth')
const datasourceSchemas = require('../datasources/schemas')

const { createPost, getPostById, getMeetingPosts, getUserPosts } = require('../controllers/post')

const router = express.Router()

// Create post
router.post('/:meetingId',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  asyncHandler(createPost),
  (req, res) => res.send(req.post)
)

// Get user posts
router.get('/user',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  asyncHandler(getUserPosts),
  (req, res) => res.send(req.posts)
)

// Get post by id
router.get('/:postId',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  asyncHandler(getPostById),
  (req, res) => res.send(req.post)
)

// Get meeting posts
router.get('/meeting/:meetingId',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  asyncHandler(getMeetingPosts),
  (req, res) => res.send(req.posts)
)

module.exports = router
