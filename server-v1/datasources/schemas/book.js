const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  imgSrc: String,
  active: Boolean,
  club: {
    type: mongoose.Schema.ObjectId,
    ref: 'Club'
  },
  meetings: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Meeting'
  }],
  created: {
    type: Date,
    default: Date.now
  }
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book