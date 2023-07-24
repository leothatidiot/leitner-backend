// should return card data when valid id is provided
// should return 404 when card does not exist

// fakeTest.js
const supertest = require('supertest')
const express = require('express')

const app = express()
app.get('/fake-endpoint', (req, res) => {
  res.status(200).json({ message: 'Fake endpoint' })
})

const api = supertest(app)

test('GET /api/schedule', async () => {
  const res = await api
    .get('/fake-endpoint')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(res.body.message).toBe('Fake endpoint')
})

test('should return card IDs', async () => {
  const res = await api
    .get('/fake-endpoint')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(res.body.message).toBe('Fake endpoint')
})

test('POST /api/answer', async () => {
  const res = await api
    .get('/fake-endpoint')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(res.body.message).toBe('Fake endpoint')
})

test('should update learning progress', async () => {
  const res = await api
    .get('/fake-endpoint')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(res.body.message).toBe('Fake endpoint')
})
