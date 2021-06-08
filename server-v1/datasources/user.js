const schemas = require('./schemas')
const auth = require('../helpers/auth')

const createUser = async ({ username, password, name }) => {
  const user = new schemas.User({
    username,
    password,
    name
  })

  await user.save()

  return user
}

const logIn = async (user) => {
  const token = auth.generateToken({
    id: user._id
  }, '24h')

  user.removeOldTokens()

  user.addToken(token)

  await user.save()

  return {
    user,
    token
  }
}

const logOut = async (user, token) => {
  user.removeToken(token)

  await user.save()

  return user
}

const findByUsername = async (username) => {
  return schemas.User.findOne({
    username
  })
}

module.exports = {
  createUser,
  logIn,
  logOut,
  findByUsername
}
