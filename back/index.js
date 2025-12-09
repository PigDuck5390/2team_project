const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require("path");
const app = express()
const pool = require('./db')

app.use(express.json())
app.use(cors())

//정적 데이터를 읽을 파일 경로, 브라우저 URL 선언 및 연결
app.use('/upload', express.static(path.join(__dirname, 'upload')));

//신규 파일 저장경로 및 파일명 규칙 선언
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, path.join(__dirname, 'upload', 'profile'))
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  }
});

//멀터 변수화
const upload = multer({ storage })



// -------------------------------------------- //



//유저정보 호출
app.get('/userinfo', async (req, res) => {
  const data = await pool.query('SELECT * FROM user')
  res.send(data)
})

//예매정보 호출
app.get('/seatlist', async (req, res) => {
  const data = await pool.query('SELECT * FROM seat')
  res.send(data)
})

//나의 예매정보 호출
app.get("/seatlist/:id", async (req, res) => {
  const data = await pool.query("SELECT * FROM seat WHERE user_id=?",
    [req.params.id]
  );
  res.send(data);
})

// 영화 포인트
app.get("/point/:id", async (req, res) => {
  const [rows] = await pool.query("SELECT COUNT(*) AS cnt FROM seat WHERE user_id=?",
    [req.params.id]
  );
  const data = Number(rows.cnt);
  res.send(data);
})

//영화정보 호출
app.get('/movies', async (req, res) => {
  const data = await pool.query(
    'SELECT * FROM movie_info')
    res.send(data)
})

//영화정보 호출 (예매누적수 기반 내림차순) 
app.get('/movieinfo', async (req, res) => {
  const data = await pool.query(
    'SELECT * FROM movie_info ORDER BY reserv_count DESC')
  res.send(data)
})

//신규 예매
app.post('/reserv', async (req, res) => {
  await pool.query(
    'INSERT INTO seat (seat_num, user_id, date, time, movie_name, userName, screen_num) VALUE (?,?,?,?,?,?,?)',
  [req.body.seat, req.body.userId, req.body.date, req.body.movieTime, req.body.movieName, req.body.userName, req.body.screen])
})

//회원가입
app.post('/join', async (req, res) => {
  await pool.query('INSERT INTO user (name, id, pw) VALUES (?,?,?)',
    [req.body.userName, req.body.userId, req.body.userPw]
  )
})

//프로필 사진 변경
app.put("/updateProfile", upload.single("profile"), async (req, res) => {  
    const filePath = `/upload/profile/${req.file.filename}`;
    await pool.query(
      "UPDATE user SET profile = ? WHERE id = ?",
      [filePath, req.body.userId]
    );
    res.json({ success: true, profile: filePath });
})

//프로필 사진 호출
app.get("/userprofile/:id", async (req, res) => {
  const data = await pool.query("SELECT profile FROM user WHERE id=?",
    [req.params.id]
  );
  res.send(data);
})

//비밀번호 변경
app.put('/changePassword', async (req, res) =>{
  await pool.query("UPDATE user SET pw = ? WHERE id =?",
    [req.body.newPassword, req.body.userId]
  )
})

//카드 신규 등록
app.post('/newcard', async (req, res)=>{
  await pool.query(
    "INSERT INTO user_card (user_id, card_num, card_date, user_defid, card_bank) VALUE (?,?,?,?,?)",
  [req.body.userId, req.body.card, req.body.cardDate, req.body.defid, req.body.bank])
})

//카드 정보 호출
app.get('/cardinfo', async (req, res)=>{
  const data = await pool.query("SELECT * FROM user_card")
  res.send(data)
})

//서버 실행
app.listen(3000, () => {
  console.log('서버 실행')
})