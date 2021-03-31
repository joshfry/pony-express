const express = require('express')
const generateId = require('../../lib/generate-id')
const { NotFoundError } = require('../../lib/not-found')
const emails = require('../../__tests__/fixtures/emails')

/*
  READ
*/
const getEmailsRoute = (req, res) => {
  res.send(emails)
}

const getEmailRoute = (req, res) => {
  const email = emails.find(email => email.id === req.params.id)
  if (!email) throw new NotFoundError()
  res.send(email)
}

/*
  CREATE
*/
const createEmailRoute = (req, res) => {
  const newEmail = { ...req.body, id: generateId() }

  // mutating fixtures because we don't have a db yet
  emails.push(newEmail)

  // conventional response after creating a new resource is `201 Created` with JSON body
  res.status(201)
  res.send(newEmail)
}

/*
  UPDATE
*/
const updateEmailRoute = (req, res) => {
  const index = emails.findIndex(email => email.id === req.params.id)
  const newEmail = { ...emails[index], ...req.body }

  // mutating fixtures because we don't have a db yet
  emails[index] = newEmail

  res.status(200)
  res.send(newEmail)
}

/*
  DELETE
*/
const deleteEmailRoute = (req, res) => {
  const index = emails.findIndex(email => email.id === req.params.id)

  // mutating fixtures because we don't have a db yet
  if (index >= 0) emails.splice(index, 1)

  // conventional response after deleting a resource is `204 No Content` and omit JSON body
  res.sendStatus(204)
}

/*
  ROUTES
*/
const emailsRouter = express.Router()

emailsRouter.get('/', getEmailsRoute)
emailsRouter.get('/:id', getEmailRoute)
emailsRouter.post('/', express.json(), createEmailRoute)
emailsRouter.patch('/:id', express.json(), updateEmailRoute)
emailsRouter.delete('/:id', deleteEmailRoute)

module.exports = emailsRouter
