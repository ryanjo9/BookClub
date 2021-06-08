const mongoose = require('mongoose')

const meetingSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book'
  },
  reading: String,
  posts: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Post'
  }],
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: () => {
      return Date.now() + 24 * 60 * 60 * 60 * 7 * 1000 // one week from now in ms
    }
  }
})

const Meeting = mongoose.model('Meeting', meetingSchema)

module.exports = Meeting
