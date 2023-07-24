const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
  deck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck',
    required: true
  },
  cardContent: {
    type: Object
  }
})

module.exports = mongoose.model('Card', cardSchema)
