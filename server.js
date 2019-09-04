const express = require('express');

const server = express();

const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")

server.use(express.json())

//custom middleware
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.ip}`)
  next()
};

server.use(logger)
server.use('/posts', postRouter)
server.use('/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

module.exports = server;
