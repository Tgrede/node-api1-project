// BUILD YOUR SERVER HERE
const express = require('express')

const User = require('./users/model')

const server = express()

server.use(express.json())



server.use('*', (req, res) => {
  res.status(404).json({message: 'resource not found in this server'})
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
