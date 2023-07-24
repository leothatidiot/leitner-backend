const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const UserDecks = require('../models/userDecks')

module.exports = {
  async getAllUsers (req, res) {
    console.log('abc')
    return res.status(500)
  },

  async getUserById (req, res) {

  },

  // 注册 POST /api/users
  async createUser (req, res) {
    const { email, password } = req.body

    // 检查邮箱是否已经注册
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' })
    }

    // 对密码进行哈希
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // 创建新用户 & 创建用户decks
    const user = new User({ email, passwordHash: hashedPassword })
    await user.save()

    const userDecks = new UserDecks({ user, learningDecks: [] })
    await userDecks.save()

    // 发送响应
    res.status(201).json({ message: 'User created successfully' })
  },

  async updateUser (req, res) {

  },

  async deleteUser (req, res) {

  },

  // 登入 POST /api/users/login
  async login (req, res) {
    const { email, password } = req.body

    try {
      const user = await User.findOne({ email })
      const isPasswordValid = (user === null)
        ? false
        : await bcrypt.compare(password, user.passwordHash)
      if (!(user && isPasswordValid)) {
        return res.status(401).json({ message: 'Invalid email or password' })
      }
      // 认证成功
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 } // 60 min
      )
      res.json({ token })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },

  // 登出 POST /api/users/logout
  async logout (req, res) {
    // client-side token need delete
    res.status(500).end()
  },

  // 查 userDeck, GET /api/users/learningDecks
  async getUserDecks (req, res) {
    if (req.user === null) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const userDecks = await UserDecks.findOne({ user: req.user._id })
    // const decks = await Deck.find({ _id: userDecks.learningDecks })

    return res.json(userDecks.learningDecks)
  },

  // 改 userDeck, POST /api/users/learningDecks
  async updateUserDecks (req, res) {
    if (req.user === null) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    await UserDecks.updateOne(
      { user: req.user._id },
      { $set: { learningDecks: req.body.learningDecks } }
    )
    const userDecks = await UserDecks.findOne({ user: req.user._id })

    return res.json(userDecks.learningDecks)
  }
}
