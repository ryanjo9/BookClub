const express = require('express')

const datasources = require('../datasources')
const auth = require('../helpers/auth')
const router = express.Router()
const mappers = require('../helpers/mappers')

// create club
router.post('/:id?',
  auth.verifyToken,
  datasources.user.verify,
  async (req, res) => {
    const { body, user } = req

    const club = new datasources.club({
      mod: user,
      activeBook: body.book,
      name: body.name,
      frequency: body.frequency,
      members: [user]
    })

    await club.save()

    return res.send(mappers.mapClub(club))
  }
)

// get club by id
router.get('/:id',
  auth.verifyToken,
  datasources.user.verify,
  async (req, res) => {
    const club = await datasources.club.findOne({
      _id: req.params.id
    }).populate('mod').populate('members')

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
  datasources.user.verify,
  async (req, res) => {
    const clubs = await datasources.club.find({
      members: {
        $in: [req.user]
      }
    }).populate('mod').populate('members')

    return res.send(clubs.map(mappers.mapClub))
  }
)

// add user to club
router.put('/member/:id',
  auth.verifyToken,
  datasources.user.verify,
  async (req, res) => {
    const { user, params } = req

    const club = await datasources.club.findById(params.id).populate('mod').populate('members')

    if (!club) {
      res.status(404)

      return res.send({ err: 'Club not found' })
    }

    club.members.push(user)

    await club.save()

    return res.send(mappers.mapClub(club))
  }
)

// delete club

module.exports = router
