const express = require('express')
const mongoose = require('mongoose')

const config = require('./utils/config')
const middleware = require('./utils/middleware')
const usersRouter = require('./routers/users')
const decksRouter = require('./routers/decks')
const cardsRouter = require('./routers/cards')
const learningProgressRouter = require('./routers/learningProgresses')

const app = express()

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log(err))

app.use(express.json())
app.use(middleware.tokenExtractor)

// 测试 记录所有HTTP请求：
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.use('/api/users', usersRouter)
app.use('/api/decks', decksRouter)
app.use('/api/cards', cardsRouter)
app.use('/api/learningProgress', learningProgressRouter)

if (process.env.NODE_ENV === 'test') {
  // const testingRouter = require('./controllers/testing')
  // app.use('/api/testing', testingRouter)
}

module.exports = app
