const express = require('express')
const router = express.Router()

const user = require('./user')
const club = require('./club')
const book = require('./book')
const meeting = require('./meeting')

router.use('/users', user)
router.use('/clubs', club)
router.use('/books', book)
router.use('/meetings', meeting)

module.exports = router
