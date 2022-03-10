const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const cardSchema = new mongoose.Schema({
    name: String,
    count: String,
    date: String,
    owner: String,
    notes: Array,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
    })

cardSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Card = mongoose.model('Card', cardSchema)

module.exports = mongoose.model('Card', cardSchema)