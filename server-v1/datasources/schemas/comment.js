const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post'
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  },
  isDeleted: Boolean,
  deletedDate: {
    type: Date,
    default: Date.now
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  editedDate: {
    type: Date,
    default: Date.now
  },
  edits: [String],
  text: String,
  seenBy: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }]
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
