const express = require('express')
const { NotFoundError } = require('../../lib/not-found')
const users = require('./users.test.fixture')

/*
  READ
*/
const getUsersRoute = (req, res) => {
  res.send(users)
}

const getUserRoute = (req, res) => {
  const user = users.find(user => user.id === req.params.id)
  if (!user) throw new NotFoundError()
  res.send(user)
}

/*
  ROUTES
*/
const _usersRouter = express.Router()

_usersRouter.get('/', getUsersRoute)
_usersRouter.get('/:id', getUserRoute)

module.exports = _usersRouter
