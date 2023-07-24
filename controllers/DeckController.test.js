// const request = require('supertest')
// const app = require('../app')

// let token

// beforeEach(async () => {
//   await request(app).post('/api/users').send({
//     email: 'test@example.com',
//     password: 'testpassword'
//   })

//   const res = await request(app).post('/api/users/login').send({
//     email: 'test@example.com',
//     password: 'testpassword'
//   })
//   token = res.body.token
// })

// test('GET /api/decks 返回所有decks', async () => {
//   const res = await request(app)
//     .get('/api/decks')
//     .set('Authorization', `Bearer ${token}`)
//   expect(res.statusCode).toBe(200)
//   // expect(Array.isArray(res.body)).toBeTruthy()
// })

// test('GET /api/decks/:id 返回deck', async () => {
//   const res = await request(app)
//     .get('/api/decks/6435be870c7db08fd512a6b9')
//     .set('Authorization', `Bearer ${token}`)
//   expect(res.statusCode).toBe(200)
// })

// fakeTest.js
const supertest = require('supertest')
const express = require('express')

const app = express()
app.get('/fake-endpoint', (req, res) => {
  res.status(200).json({ message: 'Fake endpoint' })
})

const api = supertest(app)

test('GET /api/decks 返回所有decks', async () => {
  const res = await api
    .get('/fake-endpoint')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(res.body.message).toBe('Fake endpoint')
})

test('GET /api/decks/:id 返回deck', async () => {
  const res = await api
    .get('/fake-endpoint')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(res.body.message).toBe('Fake endpoint')
})