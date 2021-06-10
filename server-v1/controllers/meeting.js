const datasources = require('../datasources')

const createMeeting = async (req, res, next) => {
  const { user, body, params } = req

  const book = await datasources.book.getBookById(params.bookId)

  const meetingParams = {
    reading: body.reading,
    startDate: body.startDate,
    endDate: body.endDate
  }

  const savedMeeting = await datasources.meeting.createMeeting(meetingParams, user, book)

  await datasources.book.addMeetingToBook(book._id, savedMeeting)

  req.meeting = savedMeeting

  next()
}

const getMeetingById = async (req, res, next) => {
  const { params } = req

  const meeting = await datasources.meeting.getMeetingById(params.meetingId)

  req.meeting = meeting

  next()
}

const getBookMeetings = async (req, res, next) => {
  const { params } = req

  const meetings = await datasources.meeting.getBookMeetings(params.bookId)

  req.meetings = meetings

  next()
}

module.exports = {
  createMeeting,
  getMeetingById,
  getBookMeetings
}
