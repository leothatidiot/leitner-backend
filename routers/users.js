const router = require('express').Router()
const UserController = require('../controllers/UserController')
const { userExtractor } = require('../utils/middleware')

// url: /api/users

router.get('/', UserController.getAllUsers)
// router.get('/:id', UserController.getUserById)
router.post('/', UserController.createUser)
router.put('/', UserController.updateUser)
router.delete('/', UserController.deleteUser)

router.post('/login', UserController.login)
// router.post('/logout', UserController.logout)

router.get('/learningDecks', userExtractor, UserController.getUserDecks)
router.post('/learningDecks', userExtractor, UserController.updateUserDecks)

module.exports = router
