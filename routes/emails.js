const express = require('express')
const readBody = require('../lib/read-body')
const generateId = require('../lib/generate-id')
const emails = require('../fixtures/emails')

const getEmailsRoute = (req, res) => {
  res.send(emails)
}

const getEmailRoute = (req, res) => {
  const email = emails.find(email => email.id === req.params.id)
  res.send(email)
}

// since `readBody` returns a promise, this will be an async function
const createEmailRoute = async (req, res) => {
  const body = await readBody(req)
  const newEmail = { ...JSON.parse(body), id: generateId() }

  // mutating fixtures because we don't have a db yet
  emails.push(newEmail)

  // conventional response after creating a new resource is `201 Created` with JSON body
  res.status(201)
  res.send(newEmail)
}

const updateEmailRoute = async (req, res) => {
  const body = await readBody(req)
  const index = emails.findIndex(email => email.id === req.params.id)
  const newEmail = { ...emails[index], ...JSON.parse(body) }

  // mutating fixtures because we don't have a db yet
  emails[index] = newEmail

  res.status(200)
  res.send(newEmail)
}

const deleteEmailRoute = (req, res) => {
  const index = emails.findIndex(email => email.id === req.params.id)

  // mutating fixtures because we don't have a db yet
  emails.splice(index, 1)

  // conventional response after deleting a resource is `204 No Content` and omit JSON body
  res.sendStatus(204)
}

const emailsRouter = express.Router()

emailsRouter.get('/', getEmailsRoute)
emailsRouter.get('/:id', getEmailRoute)
emailsRouter.post('/', createEmailRoute)
emailsRouter.patch('/:id', updateEmailRoute)
emailsRouter.delete('/:id', deleteEmailRoute)

module.exports = emailsRouter
