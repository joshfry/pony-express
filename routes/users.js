const express = require('express')
const users = require('../fixtures/users')

const getUsersRoute = (req, res) => {
  res.send(users)
}

const getUserRoute = (req, res) => {
  const user = users.find(user => user.id === req.params.id)
  res.send(user)
}

const usersRouter = express.Router()

usersRouter.get('/', getUsersRoute)
usersRouter.get('/:id', getUserRoute)

module.exports = usersRouter
