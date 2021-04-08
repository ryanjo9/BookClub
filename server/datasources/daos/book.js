const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: String,
  progress: {
    type: Number,
    default: 0
  },
  complete: {
    type: Boolean,
    default: false
  },
  imgsrc: String,
  chapters: Number,
  posts: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Post'
  }]
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
