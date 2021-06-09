const schemas = require('./schemas')

const createBook = async (book, user, club) => {
  const dbBook = new schemas.Book({
    ...book,
    meetings: [],
    createdBy: user,
    club: club._id
  })

  await dbBook.save()

  return dbBook
}

const getBookById = async (id) => {
  return schemas.Book.findById(id).populate('createdBy').populate('meetings')
}

const getClubBooks = async (clubId) => {
  return schemas.Book.find({
    club: clubId
  }).populate('createdBy')
}

module.exports = {
  createBook,
  getBookById,
  getClubBooks
}
