

//yoyo
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const Card = require('./models/card')
const cors = require('cors')
const morgan = require('morgan')
const card = require('./models/card')
  morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :response-time ms :body - '))
/*
const cards = [
    {
      id: 1,
      name: 'No Coffee',
      count: 0,
      date: '2019-05-30T17:30:31.098Z',
    },
    {
      id: 2,
      name: 'No Alcohol',
      count: 3,
      date: '2019-05-30T18:39:34.091Z',
    },
    {
      id: 3,
      name: 'No Fap',
      count: 2,
      date: '2019-05-30T19:20:14.298Z',
    }
  ]
*/


  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/cards', (request, response) => {
    Card.find({}).then(cards => {
      response.json(cards)
    })
  })

  app.get('/api/cards/:id', (request, response) => {
    const id = Number(request.params.id)
    const card = cards.find(card => {
        console.log(card.id, typeof card.id, id, typeof id, card.id === id)
        return card.id === id
      })
    console.log(card)
    response.json(card)
  })

  //Add card with post
  app.post('/api/cards', (request, response) => {
    const body = request.body
  
    if (body.name === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    const card = new Card({
      name: body.name,
      count: body.number,
      date: body.date
    })
  
    card.save().then(savedCard => {
      response.json(savedCard)
    })
  })

  //Delete card
  app.delete('/api/cards/:id', async (request, response, next) => {
    try {
      await Card.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exception) {
      next(exception)
    }
  })
  
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })