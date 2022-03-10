const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: false
  },

  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

messageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Message', messageSchema)