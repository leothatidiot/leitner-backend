const mongoose = require('mongoose')

const userDecksSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  learningDecks: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Deck'
  }]
})

module.exports = mongoose.model('UserDecks', userDecksSchema)
