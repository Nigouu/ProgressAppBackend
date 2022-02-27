require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const Card = require('./models/card')
const cors = require('cors')
const morgan = require('morgan')
const card = require('./models/card')
  morgan.token('body', (req, res) => JSON.stringify(req.body));

const cardsRouter = require('./controllers/cards')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :response-time ms :body - '))

app.use('/api/cards', cardsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)



module.exports = app