const express = require('express')
const readBody = require('../lib/read-body')
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
  const newEmail = JSON.parse(body)
  emails.push(newEmail)
}

const emailsRouter = express.Router()

emailsRouter.get('/', getEmailsRoute)
emailsRouter.get('/:id', getEmailRoute)
emailsRouter.post('/', createEmailRoute)

module.exports = emailsRouter
