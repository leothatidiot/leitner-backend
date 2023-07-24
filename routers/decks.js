const router = require('express').Router()
const DeckController = require('../controllers/DeckController')
const { userExtractor } = require('../utils/middleware')

router.get('/', userExtractor, DeckController.getAllDecks)
router.get('/:id', userExtractor, DeckController.getDeckById)

module.exports = router
