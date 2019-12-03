const express = require('express');

const users = require('./fixtures/users');
const emails = require('./fixtures/emails');

const app = express();

const getUserRoute = (req, res) => res.send(users);
const getEmailRoute = (req, res) => res.send(emails);

const router = express.Router();

router.get('/users', getUserRoute);
router.get('/emails', getEmailRoute);

app.use(router);
app.listen(3000);
