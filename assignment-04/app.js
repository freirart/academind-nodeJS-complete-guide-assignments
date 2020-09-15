const path = require('path');
const express = require('express');
const mainRoutes = require('./routes/main');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(mainRoutes);

app.use((req, res, next) => {
  res.render('404');
});

app.listen(3000);