const express = require('express')
const router = express.Router()

const user = require('./user')
const club = require('./club')

router.use('/users', user)
router.use('/clubs', club)

module.exports = router
