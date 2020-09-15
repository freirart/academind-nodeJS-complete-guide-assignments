const express = require('express');

const app = express();

// app.use((req, res, next) => {
//   console.log("First middleware.");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("Second middleware.");
//   next();
// });

app.use('/users', (req, res, next) => {
  console.log("'USERS' log.");
  res.send('<h1>USERS middleware.</h1>');
});

app.use('/', (req, res, next) => {
  console.log(`"SLASH's" log.`);
  res.send('<h1>SLASH middleware.</h1>')
});


app.listen(3000);