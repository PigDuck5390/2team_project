const express = require('express')
const cors = require('cors')

const app = express()
const pool = require('./db')

app.use(express.json())
app.use(cors())

app.get('/userinfo', async (req, res) => {
  const data = await pool.query('SELECT * FROM user')
  res.send(data)
})

app.get('/seatlist', async (req, res) => {
  const data = await pool.query('SELECT * FROM seat')
  res.send(data)
})

app.post('/join', async (req, res) => {
  await pool.query('INSERT INTO user (name, id, pw) VALUES (?,?,?)',
    [req.body.userName, req.body.userId, req.body.userPw]
  )
})


app.listen(3000, () => {
  console.log('서버 실행')
})