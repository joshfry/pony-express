import express from 'express'
import { NotFoundError } from '../../lib/not-found'
import users from './users.test.fixture'

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
const usersRouter = express.Router()

usersRouter.get('/', getUsersRoute)
usersRouter.get('/:id', getUserRoute)

export default usersRouter
