const handleRequest = (req, res) => {
  const { url, method } = req;

  res.write("<html>");
  
  if (url === '/') {
    res.write("<head><title>Greetings</title></head>");
    res.write("<body><h1>Hi there!</h1>");
    res.write("<form action='/create-user' method='POST'>");
    res.write("<input type='text' name='username' placeholder='Username' />");
    res.write("<button type='submit'>Print in console.log</button>");
    res.write("</form></body>");
  }

  if (url === '/users') {
    res.write("<head><title>User list</title></head>");
    res.write("<body><h1>Which of these are you?</h1>");
    res.write("<ul><li>User 1</li><li>User 2</li></ul>");
    res.write("<a href='/'>Return to home</a></body>");
  }

  if (url === '/create-user' && method === 'POST') {
    const body = [];

    req.on('data', chunk => {
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const regex = /\+/gi;
      const username = parsedBody.split('=')[1].replace(regex, ' ');

      console.log(username);
      res.write("<head><title>Username</title></head>");
      res.write("<body><h1>The typed username is in the console.log, and also here too.</h1>");
      res.write(`<p>${username}</p>`);
      res.write("<a href='/'>Return to home</a></body>");
    });
  }

  res.write("</html>");
  res.end();
}

module.exports = handleRequest;