const cardsRouter = require('express').Router()
const { request, response } = require('express')
const Card = require('../models/card')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

cardsRouter.get('/', async (request, response) => {
  const cards = await Card
  .find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(cards)
  })

  cardsRouter.get('/:id', async (request, response, next) => {
    const card = await Card.findById(request.params.id)
    if (card) {
      response.json(card)
    } else {
      response.status(404).end()
    }
})
  
  cardsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const card = new Card({
        name: body.name,
        count: body.number,
        date: body.date
    })

    try {
      const savedCard = await card.save()
      user.cards = user.cards.concat(savedCard._id)
      await user.save()
      response.json(savedCard)
    } catch(exception) {
      next(exception)
    }
  
  })

  cardsRouter.delete('/:id', async (request, response, next) => {
    try {
      await Card.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exception) {
      next(exception)
    }
  })

  module.exports = cardsRouter