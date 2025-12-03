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

app.get('/movies', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT movie_id, title, description FROM movie_info ORDER BY movie_id'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('영화 목록 조회 중 오류');
  }
});

// 특정 영화 정보 + 상영시간표
app.get('/movies/:movieId/screenings', async (req, res) => {
  const { movieId } = req.params;
  try {
    const [[movie]] = await pool.query(
      'SELECT movie_id, title, description, genre, runtime FROM movie WHERE movie_id = ?',
      [movieId]
    );
    if (!movie) {
      return res.status(404).send('영화를 찾을 수 없습니다.');
    }

    const [screenings] = await pool.query(
      'SELECT screening_id, screen_number, start_time FROM screening WHERE movie_id = ? ORDER BY start_time',
      [movieId]
    );

    res.json({ movie, screenings });
  } catch (err) {
    console.error(err);
    res.status(500).send('상영 정보 조회 중 오류');
  }
});

// 좌석 & 예약 상태 조회
app.get('/screenings/:screeningId/seats', async (req, res) => {
  const { screeningId } = req.params;
  try {
    // 해당 상영관 번호 찾기
    const [[screening]] = await pool.query(
      'SELECT screening_id, movie_id, screen_number, start_time FROM screening WHERE screening_id = ?',
      [screeningId]
    );
    if (!screening) {
      return res.status(404).send('상영 정보를 찾을 수 없습니다.');
    }

    // 해당 상영관의 좌석 + 예약 여부
    const [rows] = await pool.query(
      `
      SELECT 
        s.seat_id,
        s.screen_number,
        s.seat_row,
        s.seat_col,
        CASE WHEN r.seat_id IS NULL THEN 0 ELSE 1 END AS reserved
      FROM seat s
      LEFT JOIN reservation r
        ON r.seat_id = s.seat_id
       AND r.screening_id = ?
      WHERE s.screen_number = ?
      ORDER BY s.seat_row, s.seat_col
      `,
      [screeningId, screening.screen_number]
    );

    res.json({
      screening,
      seats: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('좌석 조회 중 오류');
  }
});

// 좌석 예약
app.post('/reserve', async (req, res) => {
  const { user_id, screening_id, seat_ids } = req.body;

  if (!user_id) {
    return res.status(400).send('로그인이 필요합니다.');
  }
  if (!Array.isArray(seat_ids) || seat_ids.length === 0) {
    return res.status(400).send('선택된 좌석이 없습니다.');
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    for (const seatId of seat_ids) {
      // 이미 예약된 좌석인지 체크
      const [rows] = await conn.query(
        'SELECT 1 FROM reservation WHERE screening_id = ? AND seat_id = ?',
        [screening_id, seatId]
      );
      if (rows.length > 0) {
        throw new Error(`이미 예약된 좌석이 포함되어 있습니다. (seat_id=${seatId})`);
      }

      await conn.query(
        `
        INSERT INTO reservation (user_id, screening_id, seat_id, reserved_at)
        VALUES (?, ?, ?, NOW())
        `,
        [user_id, screening_id, seatId]
      );
    }

    await conn.commit();
    res.send('예약이 완료되었습니다.');
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(400).send(err.message || '예약 중 오류 발생');
  } finally {
    conn.release();
  }
});


app.listen(3000, () => {
    console.log('서버 실행')
})