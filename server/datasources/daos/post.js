const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book'
  },
  text: String,
  created: {
    type: Date,
    default: Date.now
  }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
