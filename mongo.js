const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://libeman:${kaki}@cluster0.vhbyh.mongodb.net/ProgressCards?retryWrites=true&w=majority`

mongoose.connect(url)

const cardSchema = new mongoose.Schema({
  name: String,
  count: Integer,
  date: Date,
})

const Card = mongoose.model('Card', cardSchema)

const card = new Card({
  name: 'HTML is Easy',
  count: 0,
  date: new Date(),
})

card.save().then(result => {
  console.log('card saved!')
  mongoose.connection.close()
})