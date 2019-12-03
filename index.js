const express = require('express');

const users = require('./fixtures/users');
const emails = require('./fixtures/emails');

const app = express();

const getUsersRoute = (req, res) => res.send(users);

const getUserRoute = (req, res) => {
  const user = users.find(user => user.id === req.params.id);
  res.send(user);
};

const getEmailsRoute = (req, res) => res.send(emails);

const getEmailRoute = (req, res) => {
  const email = emails.find(email => email.id === req.params.id);
  res.send(email);
};

// create multiple routers, one for each type of resource
const usersRouter = express.Router();
const emailsRouter = express.Router();

usersRouter.get('/', getUsersRoute);
usersRouter.get('/:id', getUserRoute);

emailsRouter.get('/', getEmailsRoute);
emailsRouter.get('/:id', getEmailRoute);

app.use('/users', usersRouter);
app.use('/emails', emailsRouter);

app.listen(3000);
