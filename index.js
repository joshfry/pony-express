const express = require('express');

const users = require('./fixtures/users');
const emails = require('./fixtures/emails');

const app = express();

const getUserRoute = (req, res) => {
  res.send(users);
};

const getEmailRoute = (req, res) => {
  res.send(emails);
};

const noRouteFound = (req, res) => {
  const route = `${req.method} ${req.url}`;
  res.end(`You asked for ${route}`);
};

const routes = {
  'GET /users': getUserRoute,
  'GET /emails': getEmailRoute,
}

const router = (req, res) => {
  const route = `${req.method} ${req.url}`;
  let handler = routes[route] || noRouteFound;

  handler(req, res)
};

app.use(router);
app.listen(3000);
