// Reservation.jsx
import MainHeader from '../Main/MainHeader.jsx'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import imgSample from '../img/주토피아.jpg'
import '../css/Reservation.css'   // ✅ 이 줄 추가

function Reservation() {
  const location = useLocation()
  const navigate = useNavigate()
  const [movieData, setMovieData] = useState([])

  const { state: locateName } = location //헤더 로그인 보존

  useEffect(() => { //영화정보 조회
    fetch("http://localhost:3000/movieinfo")
      .then(response => response.json())
      .then(data => setMovieData(data))
  }, [movieData])

  function moveSeat(title, time) { //좌석선택 이동
    navigate(`/seat/${title}/${time}`)
  }

  return (
    <>
      <MainHeader />
<main className="reservation-page">
  <div className="reservation-inner">
    {movieData.map((item) => (
      <section className="reservation-card" key={item.movie_id}>
        {/* 왼쪽 포스터 */}
        <div className="reservation-poster-wrap">
          <img
            src={imgSample}
            alt={item.title}
            className="reservation-poster"
          />
        </div>

        {/* 오른쪽 정보 */}
        <div className="reservation-info">
          {/* 위쪽: 제목 + 설명 + 상영 시간 */}
          <div className="reservation-text">
            <h1 className="reservation-title">{item.title}</h1>

            <p className="reservation-desc">
              {item.description}
            </p>

            <p className="reservation-runtime">
              상영 시간 : <strong>{item.runtime}분</strong>
            </p>
          </div>

          {/* 아래쪽: 빠른 예매 */}
          <div className="reservation-quick">
            <h2 className="reservation-quick-title">빠른 예매</h2>

            <div className="reservation-times">
              {item.start_time1 && (
                <span
                  className="time-slot"
                  onClick={() => moveSeat(item.title, item.start_time1)}
                >
                  {item.start_time1}
                </span>
              )}
              {item.start_time2 && (
                <span
                  className="time-slot"
                  onClick={() => moveSeat(item.title, item.start_time2)}
                >
                  {item.start_time2}
                </span>
              )}
              {item.start_time3 && (
                <span
                  className="time-slot"
                  onClick={() => moveSeat(item.title, item.start_time3)}
                >
                  {item.start_time3}
                </span>
              )}
              {item.start_time4 && (
                <span
                  className="time-slot"
                  onClick={() => moveSeat(item.title, item.start_time4)}
                >
                  {item.start_time4}
                </span>
              )}
              {item.start_time5 && (
                <span
                  className="time-slot"
                  onClick={() => moveSeat(item.title, item.start_time5)}
                >
                  {item.start_time5}
                </span>
              )}
              {item.start_time6 && (
                <span
                  className="time-slot"
                  onClick={() => moveSeat(item.title, item.start_time6)}
                >
                  {item.start_time6}
                </span>
              )}

              {item.start_time7 && (
                <span
                  className="time-slot"
                  onClick={() => moveSeat(item.title, item.start_time6)}
                >
                  {item.start_time7}
                </span>
              )}

              {item.start_time8 && (
                <span
                  className="time-slot"
                  onClick={() => moveSeat(item.title, item.start_time6)}
                >
                  {item.start_time8}
                </span>
              )}

              {item.start_time9 && (
                <span
                  className="time-slot"
                  onClick={() => moveSeat(item.title, item.start_time6)}
                >
                  {item.start_time9}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    ))}
  </div>
</main>

    </>
  )
}

export default Reservation
