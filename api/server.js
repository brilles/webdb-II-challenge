const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const zoosRouter = require('../zoos/zoos-router.js');
const bearsRouter = require('../bears/bears-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send(
    '<p> <a href="https://zoos-app.herokuapp.com/api/zoos">zoos</a> or <a href="https://zoos-app.herokuapp.com/api/bears">bears</a></p>'
  );
});

server.use('/api/zoos', zoosRouter);
server.use('/api/bears', bearsRouter);

module.exports = server;
