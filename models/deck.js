const mongoose = require('mongoose')

const deckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  totalCards: {
    type: Number
  }
})

module.exports = mongoose.model('Deck', deckSchema)
