const express = require('express')

const datasources = require('../datasources')
const auth = require('../helpers/auth')
const router = express.Router()
const mappers = require('../helpers/mappers')

// add book to club
router.post('/:clubId',
  auth.verifyToken,
  datasources.user.User.verify,
  async (req, res) => {
    const { body, user, params } = req

    const club = await datasources.club.getClubById(params.clubId)

    if (club.mod.username !== user.username) {
      res.status(403)

      return res.send({
        err: 'User is not mod of club'
      })
    }

    const book = await datasources.book.createBook(body)

    club.activeBook = book

    club.books.push(book)

    await club.save()

    return res.send(mappers.mapBook(book))
  }
)

router.put('/:bookId',
  auth.verifyToken,
  datasources.user.User.verify,
  async (req, res) => {
    const { body, params } = req

    const book = await datasources.book.updateProgress(params.bookId, body.progress)

    return res.send(mappers.mapBook(book))
  }
)

router.put('/:bookId/complete',
  auth.verifyToken,
  datasources.user.User.verify,
  async (req, res) => {
    const { params } = req

    const book = await datasources.book.completeBook(params.bookId)

    return res.send(mappers.mapBook(book))
  }
)

module.exports = router
