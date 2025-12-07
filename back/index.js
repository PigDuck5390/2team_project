const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require("path");
const app = express()
const pool = require('./db')

app.use(express.json())
app.use(cors())

app.use('/upload', express.static(path.join(__dirname, 'upload')));

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, path.join(__dirname, 'upload', 'profile'))
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  }
});

const upload = multer({ storage })

// app.post('/admin/movie', upload.single('poster'), async (req, res) => {
//   try {
//     const { title, description, runtime, screen_number, start_time } = req.body;

//     // multer가 저장한 파일 정보
//     const posterPath = `/uploads/posters/${req.file.filename}`;

//     // DB에 INSERT
//     await pool.query(
//       `INSERT INTO movie_info
//        (title, description, runtime, screen_number, start_time, poster)
//        VALUES (?, ?, ?, ?, ?, ?)`,
//       [title, description, runtime, screen_number, start_time, posterPath]
//     );

//     res.json({ ok: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ ok: false, message: 'DB error' });
//   }
// });


app.get('/userinfo', async (req, res) => { //유저정보 호출
  const data = await pool.query('SELECT * FROM user')
  res.send(data)
})

app.get('/seatlist', async (req, res) => { //예매정보 호출
  const data = await pool.query('SELECT * FROM seat')
  res.send(data)
})

app.get('/movieinfo', async (req, res) => { //영화정보 호출
  const data = await pool.query('SELECT * FROM movie_info')
  res.send(data)
})

app.get('/movies', async (req, res) => { //영화목록 호출
  const data = await pool.query(
    'SELECT movie_id, title, description, poster, runtime FROM movie_info ORDER BY movie_id')
    res.send(data)
})

app.post('/join', async (req, res) => { //회원가입
  await pool.query('INSERT INTO user (name, id, pw) VALUES (?,?,?)',
    [req.body.userName, req.body.userId, req.body.userPw]
  )
})

app.post("/updateProfile", upload.single("profile"), async (req, res) => {
    const userId = req.body.userId;  
    const filePath = `/upload/profile/${req.file.filename}`;
    await pool.query(
      "UPDATE user SET profile = ? WHERE id = ?",
      [filePath, userId]
    );
    res.json({ success: true, profile: filePath });
})

app.get("/userprofile/:id", async (req, res) => {
  const userId = req.params.id;
  const data = await pool.query("SELECT profile FROM user WHERE id=?",
    [userId]
  );
  res.send(data);
})

app.post('/reserv', async (req, res) => {
  await pool.query(
    'INSERT INTO seat (seat_num, user_id, date, time, movie_name, userName, screen_num) VALUE (?,?,?,?,?,?,?)',
  [req.body.seat, req.body.userId, req.body.date, req.body.movieTime, req.body.movieName, req.body.userName, req.body.screen])
})

app.listen(3000, () => {
  console.log('서버 실행')
})