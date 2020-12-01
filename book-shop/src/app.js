const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');

const User = require('./models/user');

const app = express();

// third party packages settings
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', 'src/views');
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
  User.findById('5fc63efff95b96d70a541ad4')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.error(err));
});

// routes
app.use('/admin', adminRoutes);
app.use('/', shopRoutes);

// default 404 page
app.use(errorController.get404Page);

module.exports = app;