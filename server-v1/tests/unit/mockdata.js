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
    name: 'first setup club'
  },
  setupClub2: {
    name: 'second setup club'
  },
  testClub1: {
    name: 'first club'
  },
  testClub2: {
    name: 'second club'
  },
  testClub3: {
    name: 'third club'
  },
  testClub4: {
    name: 'fourth club'
  }
}

const books = {
  testBook1: {
    title: 'test book 1',
    chapters: 10,
    imgsrc: 'https://www.google.com'
  },
  testBook2: {
    title: 'test book 2',
    chapters: 10,
    imgsrc: 'https://www.google.com'
  }
}

module.exports = {
  ...users,
  ...clubs,
  ...books
}
