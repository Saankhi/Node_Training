const http = require('http');
const app = require('./app')

const port = process.env.PORT || 3000;

const Server = http.createServer(app);

Server.listen(port);

