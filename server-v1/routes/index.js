const express = require('express')
const router = express.Router()

const user = require('./user')
const club = require('./club')
const book = require('./book')

router.use('/users', user)
router.use('/clubs', club)
router.use('/books', book)

module.exports = router
