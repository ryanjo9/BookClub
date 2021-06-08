const express = require('express')
const asyncHandler = require('express-async-handler')
const auth = require('../helpers/auth')
const datasourceSchemas = require('../datasources/schemas')
const { createUser, logIn, logOut } = require('../controllers/user')

const router = express.Router()

router.post('/',
  asyncHandler(createUser),
  (req, res) => res.send(req.resUser)
)

router.post('/login',
  asyncHandler(logIn),
  (req, res) => res.send(req.resUser)
)

router.delete('/',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  asyncHandler(logOut),
  (req, res) => res.sendStatus(200)
)

// Get current user if logged in
router.get('/',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  (req, res) => res.send(req.user)
)

module.exports = router
