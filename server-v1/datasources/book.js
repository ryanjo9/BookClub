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

const addMeetingToBook = async (bookId, meeting) => {
  const update = { $push: { meetings: meeting } }
  const options = { new: true, upsert: true }

  return schemas.Book.findByIdAndUpdate(bookId, update, options)
}

module.exports = {
  createBook,
  getBookById,
  getClubBooks,
  addMeetingToBook
}
