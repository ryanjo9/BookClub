const express = require('express')
const asyncHandler = require('express-async-handler')
const auth = require('../helpers/auth')
const datasourceSchemas = require('../datasources/schemas')
const { createClub, getClubById, getUserClubs, joinClub, getAllClubs } = require('../controllers/club')

const router = express.Router()

// Create Club
router.post('/',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  asyncHandler(createClub),
  (req, res) => res.send(req.club)
)

// Get All Clubs
router.get('/all',
  asyncHandler(getAllClubs),
  (req, res) => res.send(req.clubs)
)

// Get Club by Id
router.get('/:clubId',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  asyncHandler(getClubById),
  (req, res) => res.send(req.club)
)

// Get User Club
router.get('/',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  asyncHandler(getUserClubs),
  (req, res) => res.send(req.clubs)
)

// Join Club
router.post('/:clubId/join',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  asyncHandler(joinClub),
  (req, res) => res.send(req.club)
)

// Remove member

module.exports = router
