const express = require('express')
const cors = require('cors')

const app = express()
const pool = require('./db')

app.use(express.json())
app.use(cors())

app.get('/user', async (req, res) => {
  const data = await pool.query('SELECT * FROM user')
  res.send(data)
})

app.get('/seat', async (req, res) => {
  const data = await pool.query('SELECT * FROM seat')
  res.send(data)
})

app.get('/movie_info', async (req, res) => {
  const data = await pool.query('SELECT * FROM movie_info')
  res.send(data)
})

app.listen(3000, () => {
    console.log('서버 실행')
})