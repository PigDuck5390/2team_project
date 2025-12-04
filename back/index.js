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

app.post('/join', async (req, res) => {
  await pool.query('INSERT INTO user (name, id, pw) VALUES (?,?,?)',
    [req.body.userName, req.body.userId, req.body.userPw]
  )
})

app.get('/movies/:movieId/screenings', async (req, res) => {
  const { movieId } = req.params;

  try {
    const [movieRows] = await pool.query(
      "SELECT * FROM movie_info WHERE movie_id = ?",
      [movieId]
    );

    const movie = movieRows[0];
    if (!movie) return res.status(404).send("영화 없음");

    const [screenRows] = await pool.query(
      "SELECT screening_id, screen_number, start_time FROM screen WHERE movie_id = ?",
      [movieId]
    );

    res.json({ movie, screenings: screenRows });
  } catch (err) {
    console.error(err);
    res.status(500).send("상영 정보 조회 오류");
  }
});



app.listen(3000, () => {
  console.log('서버 실행')
})