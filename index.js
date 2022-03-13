
const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)



  
  const PORT = process.env.PORT || 3001
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })




  /* Vanha metodi (toimiva)
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

  */