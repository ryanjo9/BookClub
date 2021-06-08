const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const auth = require('../../helpers/auth.js')

const SALT_WORK_FACTOR = 10

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  tokens: []
})

userSchema.pre('save', async function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) { return next() }

  try {
    // generate a salt
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)

    // hash the password along with our new salt
    const hash = await bcrypt.hash(this.password, salt)

    // override the plaintext password with the hashed one
    this.password = hash
    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
})

userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch
  } catch (error) {
    return false
  }
}

userSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  delete obj.tokens
  return obj
}

userSchema.methods.addToken = function (token) {
  this.tokens.push(token)
}

userSchema.methods.removeToken = function (token) {
  this.tokens = this.tokens.filter(t => t !== token)
}

userSchema.methods.removeOldTokens = function () {
  this.tokens = auth.removeOldTokens(this.tokens)
}

// middleware to validate user account
userSchema.statics.verify = async function (req, res, next) {
  // look up user account
  const user = await User.findOne({
    _id: req.user_id
  })
  if (!user || !user.tokens.includes(req.token)) {
    return res.clearCookie('token').status(403).send({
      error: 'Invalid user account.'
    })
  }

  req.user = user

  next()
}

const User = mongoose.model('User', userSchema)

module.exports = User
