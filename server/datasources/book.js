const daos = require('./daos')

const createBook = async (book) => {
  const dbBook = new daos.Book({
    title: book.title,
    progress: 0,
    chapters: book.chapters,
    imgsrc: book.imgsrc,
    complete: false
  })

  await dbBook.save()

  return dbBook
}

const updateProgress = async (bookId, progress) => {
  const book = await daos.Book.findById(bookId)

  if (!book) {
    return null
  }

  book.progress = progress

  await book.save()

  return book
}

const completeBook = async (bookId) => {
  const book = await daos.Book.findById(bookId)

  if (!book) {
    return null
  }

  book.complete = true

  await book.save()

  return book
}

const getBookById = async (bookId) => {
  return daos.Book.findById(bookId)
}

module.exports = {
  createBook,
  updateProgress,
  completeBook,
  getBookById,
  Book: daos.Book
}
