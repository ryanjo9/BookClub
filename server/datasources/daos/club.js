const mongoose = require('mongoose')

const clubSchema = new mongoose.Schema({
  activeBook: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book'
  },
  mod: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  name: String,
  frequency: String,
  created: {
    type: Date,
    default: Date.now
  },
  members: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  books: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Book'
  }]
})

const Club = mongoose.model('Club', clubSchema)

module.exports = Club
