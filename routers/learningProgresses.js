const router = require('express').Router()
const learningProgressController = require('../controllers/learningProgressController')
const { userExtractor } = require('../utils/middleware')

// url: /api/learningProgress

router.get('/schedule', userExtractor, learningProgressController.schedule)
router.post('/answer', userExtractor, learningProgressController.answer)

module.exports = router
