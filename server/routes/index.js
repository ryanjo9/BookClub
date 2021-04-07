const express = require('express')
const router = express.Router()

const club = require('./club')
const user = require('./user')

router.use('/clubs', club)
router.use('/users', user)

module.exports = router
