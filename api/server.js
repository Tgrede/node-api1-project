// BUILD YOUR SERVER HERE
const express = require('express')

const User = require('./users/model')

const server = express()

server.use(express.json())

server.get('/api/users', (req, res) => {
  User.find()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json({message: "The users information could not be retrieved"})
  })
})

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id
  User.findById(id)
  .then(user => {
    if(!user){
      res.status(404).json({message: "The user with the specified ID does not exist"})
    } else {
      res.status(200).json(user)
    }
  })
  .catch((err) => {
    res.status(500).json({message: "The user information could not be retrieved"})
  })
})

server.post('/api/users', (req, res) => {
  const newUser = req.body
  if(!newUser.name || !newUser.bio){
    res.status(422).json({message: 'Please provide name and bio for the user'})
  } else{
    User.insert(newUser)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({message: "There was an error while saving the user to the database"})
    })
  }
})

server.put('/api/users/:id', async (req, res) => {
  const {id} = req.params
  const changes = req.body

  try{
    if(!changes.name || !changes.bio){
      res.status(400).json({message: "Please provide name and bio for the user"})
    } else {
      const updatedUser = await User.update(id, changes)
      if (!updatedUser){
        res.status(404).json({message: 'the user with the specified ID does not exist '})
        } else {
          res.status(200).json(updatedUser)
        }
      }
    } catch(err) {
      res.status(500).json({message:"The user information could not be modified"})
    }
})

server.delete('/api/users/:id', async (req, res) => {
  try{
    const deleted = await User.remove(req.params.id)
    if (!deleted){
      res.status(404).json({message: "there was an issue deleting this resource"})
    } else {
      res.json(deleted)
    }
  } catch(err) {
    res.status(404).json({message: err.message})
  }
})

server.use('*', (req, res) => {
  res.status(404).json({message: 'resource not found in this server'})
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
