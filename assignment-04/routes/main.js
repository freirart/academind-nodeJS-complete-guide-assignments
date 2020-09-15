const express = require('express');
const router = express.Router();

const rootDir = require('../utils/path');

const users = [];

router.get('/users', (req, res, next) => {
  res.render('users', {users, pageTitle: 'Users List', path: '/users'});
});

router.get('/', (req, res, next) => {
  res.render('index', {pageTitle: 'Home', path: '/'});
});

router.post('/', (req, res, next) => {
  const {username} = req.body;
  users.push({'username': username});
  res.redirect('/users');
});

module.exports = router;