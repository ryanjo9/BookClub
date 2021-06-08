const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  meeting: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meeting'
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
  isEdited: Boolean,
  editedDate: {
    type: Date,
    default: Date.now
  },
  edits: [String],
  text: String,
  seenBy: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Comment'
  }]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
