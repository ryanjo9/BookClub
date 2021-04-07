const express = require('express')

const datasources = require('../datasources')
const auth = require('../helpers/auth')
const router = express.Router()
const mappers = require('../helpers/mappers')

// create club
router.post('/:id?',
  auth.verifyToken,
  datasources.user.User.verify,
  async (req, res) => {
    const { body, user } = req

    const club = await datasources.club.createClub({
      mod: user,
      activeBook: body.book,
      name: body.name,
      frequency: body.frequency,
      members: [user]
    })

    return res.send(mappers.mapClub(club))
  }
)

// get club by id
router.get('/:id',
  auth.verifyToken,
  datasources.user.User.verify,
  async (req, res) => {
    const club = await datasources.club.getClubById(req.params.id)

    if (!club) {
      res.status(404)

      return res.send({ err: 'Club not found.' })
    }

    return res.send(mappers.mapClub(club))
  }
)

// get user clubs
router.get('/',
  auth.verifyToken,
  datasources.user.User.verify,
  async (req, res) => {
    const clubs = await datasources.club.getUserClubs(req.user)

    return res.send(clubs.map(mappers.mapClub))
  }
)

// add user to club
router.put('/:id/member',
  auth.verifyToken,
  datasources.user.User.verify,
  async (req, res) => {
    const { user, params } = req

    const club = await datasources.club.addUserToClub(user, params.id)

    return res.send(mappers.mapClub(club))
  }
)

// delete club

module.exports = router
