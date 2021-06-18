const datasources = require('../datasources')

// Create Club
const createClub = async (req, res, next) => {
  const { body, user } = req

  const club = {
    name: body.name,
    books: [],
    mods: [user],
    members: [user]
  }

  const savedClub = await datasources.club.createClub(club, user)

  req.club = savedClub

  next()
}

// Get Club by Id
const getClubById = async (req, res, next) => {
  const { params } = req

  const club = await datasources.club.getClubById(params.clubId)

  req.club = club

  next()
}

// Get User Clubs
const getUserClubs = async (req, res, next) => {
  const { user } = req

  const clubs = await datasources.club.getUserClubs(user)

  req.clubs = clubs

  next()
}

// Join Club
const joinClub = async (req, res, next) => {
  const { user, params } = req

  const joinedClub = await datasources.club.joinClub(params.clubId, user)

  req.club = joinedClub

  next()
}

const getAllClubs = async (req, res, next) => {
  const clubs = await datasources.club.getAllClubs()

  req.clubs = clubs

  next()
}

// Remove member

module.exports = {
  createClub,
  getClubById,
  getUserClubs,
  joinClub,
  getAllClubs
}
