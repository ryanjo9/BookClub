const datasources = require('../datasources')

const createUser = async (req, res, next) => {
  try {
    //  check to see if username already exists
    const existingUser = await datasources.user.findByUsername(req.body.username)

    if (existingUser) {
      return res.status(403).send({
        message: 'That username already exists.'
      })
    }

    // create new user
    const user = await datasources.user.createUser({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name
    })

    const { user: loggedInUser, token } = await datasources.user.logIn(user)

    req.resUser = loggedInUser

    res.cookie('token', token, {
      expires: new Date(Date.now() + 86400 * 1000)
    })

    res.status(200)

    next()
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const logIn = async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({
      message: 'Username and password are required.'
    })
  }

  try {
    //  lookup user record
    const existingUser = await datasources.user.findByUsername(req.body.username)

    if (!existingUser) {
      return res.status(403).send({
        message: 'The username or password is wrong.'
      })
    }

    // check password
    if (!await existingUser.comparePassword(req.body.password)) {
      return res.status(403).send({
        message: 'The username or password is wrong.'
      })
    }

    const { user: loggedInUser, token } = await datasources.user.logIn(existingUser)

    req.resUser = loggedInUser

    res.cookie('token', token, {
      expires: new Date(Date.now() + 86400 * 1000)
    })

    res.status(200)

    next()
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const logOut = async (req, res, next) => {
  await datasources.user.logOut(req.user, req.token)

  res.clearCookie('token')

  next()
}

// const findByUsername = async (req, res, next) => {

// }

module.exports = {
  createUser,
  logIn,
  logOut
  // findByUsername
}
