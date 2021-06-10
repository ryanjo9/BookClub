const schemas = require('./schemas')

const createMeeting = async (meeting, user, book) => {
  const dbMeeting = new schemas.Meeting({
    ...meeting,
    posts: [],
    createdBy: user,
    book: book._id
  })

  await dbMeeting.save()

  return dbMeeting
}

const getMeetingById = async (id) => {
  return schemas.Meeting.findById(id).populate('createdBy').populate('posts')
}

const getBookMeetings = async (bookId) => {
  return schemas.Meeting.find({
    book: bookId
  }).populate('createdBy')
}

module.exports = {
  createMeeting,
  getMeetingById,
  getBookMeetings
}
