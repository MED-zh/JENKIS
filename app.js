// app.js

const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, world  i am mohamed zahouane \n');
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
})
