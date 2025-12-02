const express = require('express')
const cors = require('cors')

const app = express()
const pool = require('./db')

app.use(express.json())
app.use(cors())

app.get('/', async(req, res) => {
  const data = await pool.query('SELECT * FROM user')
})

app.listen(3000, () => {
    console.log('서버 실행')
})