const mongoose = require('mongoose')

const book = require('./book')
const club = require('./club')
const comment = require('./comment')
const meeting = require('./meeting')
const post = require('./post')
const user = require('./user')

// connect to the database
mongoose.connect('mongodb://localhost:27017/bookclub-v1', {
  useNewUrlParser: true
})

// Print mongoose queries
// mongoose.set('debug', true)

const closeMongoConnection = async () => {
  await mongoose.connection.close()
}

module.exports = {
  closeMongoConnection,
  book,
  club,
  comment,
  meeting,
  post,
  user
}
