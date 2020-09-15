const path = require('path');
const express = require('express');
const app = express();

const mainRoutes = require('./routes/main');

app.use(mainRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);