const mongoose = require('mongoose')

const clubSchema = new mongoose.Schema({
  name: String,
  books: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Book'
  }],
  mods: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  members: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  }
})

const Club = mongoose.model('Club', clubSchema)

module.exports = Club
