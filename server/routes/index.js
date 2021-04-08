const express = require('express')
const router = express.Router()

const book = require('./book')
const club = require('./club')
const post = require('./post')
const user = require('./user')

router.use('/books', book)
router.use('/clubs', club)
router.use('/posts', post)
router.use('/users', user)

module.exports = router
