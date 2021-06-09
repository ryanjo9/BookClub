const express = require('express')
const asyncHandler = require('express-async-handler')
const auth = require('../helpers/auth')
const datasourceSchemas = require('../datasources/schemas')
const { createBook, getBookById, getClubBooks } = require('../controllers/book')

const router = express.Router()

// Create book
router.post('/:clubId',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  asyncHandler(createBook),
  (req, res) => res.send(req.book)
)

// Get book by id
router.get('/:bookId',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  asyncHandler(getBookById),
  (req, res) => res.send(req.book)
)

// Get club books
router.get('/club/:clubId',
  auth.verifyToken,
  datasourceSchemas.User.verify,
  asyncHandler(getClubBooks),
  (req, res) => res.send(req.books)
)

module.exports = router
