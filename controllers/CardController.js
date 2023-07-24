const Card = require('../models/card')
const Deck = require('../models/deck')

module.exports = {
  async getAllCard (req, res) {
    // 不可用
    if (req.user === null) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const allCard = await Card.find({})
    return res.json(allCard)
  },

  async getCardById (req, res) {
    if (req.user === null) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    try {
      const existingCard = await Card.findById(req.params.id)
      if (existingCard) {
        const deck = await Deck.findOne({ _id: existingCard.deck })
        let card
        if (deck.name === 'Oxford-5000') {
          card = {
            _id: req.params.id,
            content: {
              frontContent: [
                existingCard.cardContent['data-hw'],
                existingCard.cardContent.pos,
                existingCard.cardContent.senses.sense1.examples[0].trim()
              ],
              backContent: [existingCard.cardContent.senses.sense1.define]
            }
          }
        } else { // 其他deck
          // pass
        }
        return res.json(card)
      } else {
        console.log(existingCard, 'existingCard')
        return res.status(404).json({ message: '此card不存在' })
      }
    } catch (exception) {
      console.log('err: ', exception)
      return res.status(500).json({ message: '获取card失败' })
    }
  }
}
