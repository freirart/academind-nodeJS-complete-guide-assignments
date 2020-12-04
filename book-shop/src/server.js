const { createServer } = require('http');
const app = require('./app');
const { connect } = require('mongoose');

const port = process.env.PORT || 3000;
const server = createServer(app);

connect(
  process.env.DB_URI, 
  {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true},
  () => {
    server.listen(port);
    console.log(`Server running on http://localhost:${port}\n`)
  }
);