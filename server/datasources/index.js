const book = require('./book')
const club = require('./club')
const comment = require('./comment')
const post = require('./post')
const user = require('./user')

const mongoose = require('mongoose')

// connect to the database
mongoose.connect('mongodb://localhost:27017/bookclub', {
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
  post,
  user
}
