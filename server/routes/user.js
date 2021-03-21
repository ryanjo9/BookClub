const express = require('express')

const datasources = require('../datasources')
const auth = require('../helpers/auth')
const router = express.Router()

const mapUser = (user) => {
  return {
    id: user.id,
    username: user.username,
    name: user.name
  }
}

// create a new user
router.post('/', async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.name) {
    return res.status(400).send({
      message: 'Name, username, and password are required.'
    })
  }

  try {
    //  check to see if username already exists
    const existingUser = await datasources.user.findOne({
      username: req.body.username
    })
    if (existingUser) {
      return res.status(403).send({
        message: 'That username already exists.'
      })
    }

    // create new user
    const user = new datasources.user({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name
    })
    await user.save()
    login(user, res)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
})

// login
router.post('/login', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({
      message: 'Username and password are required.'
    })
  }

  try {
    //  lookup user record
    const existingUser = await datasources.user.findOne({
      username: req.body.username
    })
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

    login(existingUser, res)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
})

async function login (user, res) {
  const token = auth.generateToken({
    id: user._id
  }, '24h')

  user.removeOldTokens()
  user.addToken(token)
  await user.save()

  const resUser = mapUser(user)

  return res
    .cookie('token', token, {
      expires: new Date(Date.now() + 86400 * 1000)
    })
    .status(200).send(resUser)
}

// Logout
router.delete('/', auth.verifyToken, datasources.user.verify, async (req, res) => {
  req.user.removeToken(req.token)
  await req.user.save()
  res.clearCookie('token')
  res.sendStatus(200)
})

// Get current user if logged in.
router.get('/', auth.verifyToken, datasources.user.verify, async (req, res) => {
  return res.send(req.user)
})

module.exports = router
