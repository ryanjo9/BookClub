const express = require('express')
const asyncHandler = require('express-async-handler')
const auth = require('../helpers/auth')
const datasourceSchemas = require('../datasources/schemas')
const { createMeeting, getBookMeetings, getMeetingById } = require('../controllers/meeting')

const router = express.Router()

// Create meeting
router.post('/:bookId',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  asyncHandler(createMeeting),
  (req, res) => res.send(req.meeting)
)

// Get Meeting by id
router.get('/:meetingId',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  asyncHandler(getMeetingById),
  (req, res) => res.send(req.meeting)
)

// Get book meetings
router.get('/book/:bookId',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  asyncHandler(getBookMeetings),
  (req, res) => res.send(req.meetings)
)

module.exports = router
