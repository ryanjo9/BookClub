const express = require('express')
const router = express.Router()

const book = require('./book')
const club = require('./club')
const user = require('./user')

router.use('/books', book)
router.use('/clubs', club)
router.use('/users', user)

module.exports = router
