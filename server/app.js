const express = require('express')
const bodyParser = require('body-parser')

const routes = require('./routes')
// const { TESTING } = require('./settings')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

const mongoose = require('mongoose')

// connect to the database
mongoose.connect('mongodb://localhost:27017/bookclub', {
  useNewUrlParser: true
})

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use('/api', routes)

// if (!TESTING) {
//   console.log('app listening!!!')
//   app.listen(3002, () => console.log('Server listening on port 3002!'))
// }

module.exports = app
