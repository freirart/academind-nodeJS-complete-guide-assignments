const { createServer } = require('http');
const app = require('./app');
const { mongoConnect } = require('./utils/database');

const port = process.env.PORT || 3000;
const server = createServer(app);

mongoConnect(() => {
  server.listen(port);
  console.log(`Server running on http://localhost:${port}\n`)
});