const users = {
  setupUser1: {
    username: 'setupuser1',
    password: 'password',
    name: 'first'
  },
  setupUser2: {
    username: 'setupuser2',
    password: 'password',
    name: 'second'
  },
  testUser1: {
    username: 'testuser1',
    password: 'password',
    name: 'first'
  }
}

const clubs = {
  setupClub1: {
    name: 'first setup club',
    frequency: 'weekely'
  },
  setupClub2: {
    name: 'second setup club',
    frequency: 'monthly'
  },
  testClub1: {
    name: 'first club',
    frequency: 'weekely'
  },
  testClub2: {
    name: 'second club',
    frequency: 'monthly'
  },
  testClub3: {
    name: 'thrid club',
    frequency: 'weekly'
  },
  testClub4: {
    name: 'fourth club',
    frequency: 'weekly'
  }
}

module.exports = {
  ...users,
  ...clubs
}
