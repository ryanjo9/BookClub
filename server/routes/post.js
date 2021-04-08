const express = require('express')

const datasources = require('../datasources')
const auth = require('../helpers/auth')
const router = express.Router()
const mappers = require('../helpers/mappers')

// add post to book
router.post('/:bookId',
  auth.verifyToken,
  datasources.user.User.verify,
  async (req, res) => {
    const { body, user, params } = req

    const book = await datasources.book.getBookById(params.bookId)

    if (!book) {
      res.status(404)

      return res.send({
        err: 'Book not found'
      })
    }

    const postData = {
      text: body.text,
      book
    }

    const post = await datasources.post.createPost(postData, user)

    book.posts.push(post)

    await book.save()

    return res.send(mappers.mapPost(post))
  }
)

// get posts for book
router.get('/book/:bookId',
  auth.verifyToken,
  datasources.user.User.verify,
  async (req, res) => {
    const { params } = req

    const posts = await datasources.post.getBookPosts(params.bookId)

    return res.send(posts.map(mappers.mapPost))
  }
)

// get posts made by user
router.get('/user',
  auth.verifyToken,
  datasources.user.User.verify,
  async (req, res) => {
    const { user } = req

    const posts = await datasources.post.getUserPosts(user)

    return res.send(posts.map(mappers.mapPost))
  }
)

router.get('/:postId',
  auth.verifyToken,
  datasources.user.User.verify,
  async (req, res) => {
    const { params } = req

    const posts = await datasources.post.getPostById(params.postId)

    return res.send(mappers.mapPost(posts))
  }
)

module.exports = router
