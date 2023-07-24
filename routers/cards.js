const router = require('express').Router()
const CardController = require('../controllers/CardController')
const { userExtractor } = require('../utils/middleware')

// router.get('/', userExtractor, CardController.getAllCard)
router.get('/:id', userExtractor, CardController.getCardById)

module.exports = router
