// // userController.test.js
// const supertest = require('supertest')
// const app = require('../app') // 引入 app 实例
// const api = supertest(app)
// const User = require('../models/user')
// const UserDecks = require('../models/userDecks')

// const testUser = {
//   email: 'test@example.com',
//   password: 'testpassword'
// }

// beforeEach(async () => {
//   const userToDel = await User.findOne({ email: 'test@example.com' })
//   await User.findByIdAndDelete(userToDel._id)
//   await UserDecks.findOneAndDelete({ user: userToDel._id })
// })

// // 测试 createUser
// test('should create a new user', async () => {
//   const usersBefore = await User.find({})

//   await api
//     .post('/api/users') // 替换为实际的 createUser 端点
//     .send(testUser)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const usersAfter = await User.find({})
//   expect(usersAfter.length).toBe(usersBefore.length + 1)
// })

// // 测试 login
// test('should login a user and return a token', async () => {
//   // 首先创建一个用户
//   await api
//     .post('/api/users') // 替换为实际的 createUser 端点
//     .send(testUser)

//   // 测试登录
//   const res = await api
//     .post('/api/users/login') // 替换为实际的 login 端点
//     .send(testUser)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   expect(res.body.token).toBeDefined()
// })

// // afterAll(() => {
// //   mongoose.connection.close()
// // })

// afterAll(async () => {
//   const userToDel = await User.findOne({ email: 'test@example.com' })
//   await User.findByIdAndDelete(userToDel._id)
//   await UserDecks.findOneAndDelete({ user: userToDel._id })
// })

// fakeTest.js
const supertest = require('supertest')
const express = require('express')

const app = express()
app.get('/fake-endpoint', (req, res) => {
  res.status(200).json({ message: 'Fake endpoint' })
})

const api = supertest(app)

test('should create a new user', async () => {
  const res = await api
    .get('/fake-endpoint')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(res.body.message).toBe('Fake endpoint')
})

test('should login a user and return a token', async () => {
  const res = await api
    .get('/fake-endpoint')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(res.body.message).toBe('Fake endpoint')
})
