const Deck = require('../models/deck')

const getAllDecks = async (req, res) => {
  if (req.user === null) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    const decks = await Deck.find({})
    return res.json(decks)
  } catch {
    return res.status(500).json({ message: '获取decks失败' })
  }
}

const getDeckById = async (req, res) => {
  if (req.user === null) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    const { id } = req.params.id
    const deck = await Deck.findById(id)
    return res.json(deck)
  } catch {
    return res.status(500).json({ message: '获取deck失败' })
  }
}

module.exports = { getAllDecks, getDeckById }
