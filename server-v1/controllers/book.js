const datasources = require('../datasources')

const createBook = async (req, res, next) => {
  const { user, body, params } = req

  const club = await datasources.club.getClubById(params.clubId)
  console.log('body: ', body)
  const bookParams = {
    title: body.title,
    author: body.author,
    imgSrc: body.imgSrc
  }

  const savedBook = await datasources.book.createBook(bookParams, user, club)

  await datasources.club.addBookToClub(club._id, savedBook)

  req.book = savedBook

  next()
}

const getBookById = async (req, res, next) => {
  const { params } = req

  const book = await datasources.book.getBookById(params.bookId)

  req.book = book

  next()
}

const getClubBooks = async (req, res, next) => {
  const { params } = req

  const books = await datasources.book.getClubBooks(params.clubId)

  req.books = books

  next()
}

module.exports = {
  createBook,
  getBookById,
  getClubBooks
}
