const express = require('express')
const cors = require('cors')

const app = express()
const pool = require('./db')

app.use(express.json())
app.use(cors())

app.get('/user', async(req, res) => {
  const data = await pool.query('SELECT * FROM user')
  res.send(data)
})

app.get('/seat', async(req, res) => {
  const data = await pool.query('SELECT * FROM seat')
  res.send(data)
})

app.get('/movie_info', async(req, res) => {
  const data = await pool.query('SELECT * FROM movie_info')
  res.send(data)
})

// 회원가입
app.post('/join', async (req, res) => {
    try {
        await pool.query(
            'INSERT INTO user(name, id, pw) VALUES (?, ?, ?)',
            [req.body.name, req.body.id, req.body.pw]
        );
        res.send("회원가입 완료");
    } catch (err) {
        res.status(400).send("이미 존재하는 아이디입니다.");
    }
});

// 로그인
app.post('/login', async (req, res) => {
    const rows = await pool.query(
        'SELECT * FROM user WHERE id=? AND pw=?',
        [req.body.id, req.body.pw]
    );
    if (rows.length === 0) {
        return res.status(400).send("아이디 또는 비밀번호가 틀렸습니다.");
    }
    res.send("로그인 성공");
});

app.listen(3000, () => {
    console.log('서버 실행')
})