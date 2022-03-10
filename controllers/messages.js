const messageRouter = require('express').Router()
const User = require('../models/user')
const Message = require('../models/message')
const jwt = require('jsonwebtoken')

//Get token
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

//Get all
messageRouter.get('/', async (request, response) => {
    const messages = await Message
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(messages)
})

//Post
messageRouter.post('/', async (request, response) => {
    const body = request.body

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
  
    const message = new Message({
      content: body.content,
      username: body.username,
      date: new Date(),
      user: user._id 
    })
  
    const savedMessage = await message.save()
    user.messages = user.messages.concat(savedMessage._id)
    await user.save()
  
    response.status(201).json(savedMessage)
  })

//Delete
messageRouter.delete('/:id', async (request, response) => {
    await Message.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = messageRouter