const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./src/routes/admin');
const shopRoutes = require('./src/routes/shop');

const errorController = require('./src/controllers/error');

const app = express();

// third party packages settings
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', 'src/views');
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/admin', adminRoutes);
app.use('/', shopRoutes);

// default 404 page
app.use(errorController.get404Page);

app.listen(3000);