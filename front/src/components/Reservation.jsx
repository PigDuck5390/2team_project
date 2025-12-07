// Reservation.jsx
import MainHeader from '../Main/MainHeader.jsx'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import imgSample from '../img/주토피아.jpg'
import '../css/Reservation.css'   // ✅ 이 줄 추가

function Reservation() {
  const { state : userInfo } = useLocation() //헤더 로그인 보존 및 유저 정보
  const navigate = useNavigate()
  const [movieData, setMovieData] = useState([])
  const [date, setDate] = useState({});
  const today = new Date().toISOString().split('T')[0];  // 🔹 YYYY-MM-DD 형태


  useEffect(() => { //영화정보 조회
    fetch("http://localhost:3000/movieinfo")
      .then(response => response.json())
      .then(data => setMovieData(data))
  }, [movieData])

  function moveSeat(title, time, date, screen) { //좌석선택 이동
    if(!userInfo.id){
      alert("로그인 해주세요")
      return;
    }
    if(!date){
    alert("날짜를 선택해주세요.")
    return;
    }
    navigate(`/seat/${title}/${time}/${date}/${screen}`, 
      { state : {
      name : userInfo.name,
      id : userInfo.id
    }} )
    
    
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
            <h1 className="reservation-title">
              {item.screen_number}관 : {item.title}</h1>

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
            <label
            className="reservation-date-wrapper"
            onClick={(e) => {
            const input = e.currentTarget.querySelector('input[type="date"]');
            if (input) input.focus();   // 모든 브라우저에서 지원
              if (input.showPicker) {     // 크롬/엣지면 달력 바로 열기
                input.showPicker();
            }
            }}
            >
               <input
            id={item.movie_id}
            name="date"
            type="date"
            className="reservation-date-input"
            min={today}
            value={date[item.movie_id] || ''}
            onChange={(e) =>
              setDate(prev => ({
                ...prev,
                [item.movie_id]: e.target.value
              }))
            }
          />
            </label>
          
            <div className="reservation-times">
              {item.start_time1 && (
                <span
                  className="time-slot"
                  onClick={() => moveSeat(
                    item.title, item.start_time1, date[item.movie_id], item.screen_number)}
                >
                  {item.start_time1}
                </span>
              )}
              {item.start_time2 && (
                <span
                  className="time-slot"
                  onClick={() => moveSeat(
                    item.title, item.start_time2, date[item.movie_id], item.screen_number)}
                >
                  {item.start_time2}
                </span>
              )}
              {item.start_time3 && (
                <span
                  className="time-slot"
                  onClick={() => moveSeat(
                    item.title, item.start_time3, date[item.movie_id], item.screen_number)}
                >
                  {item.start_time3}
                </span>
              )}
              {item.start_time4 && (
                <span
                  className="time-slot"
                  onClick={() => moveSeat(
                    item.title, item.start_time4, date[item.movie_id], item.screen_number)}
                >
                  {item.start_time4}
                </span>
              )}
              {item.start_time5 && (
                <span
                  className="time-slot"
                  onClick={() => moveSeat(
                    item.title, item.start_time5, date[item.movie_id], item.screen_number)}
                >
                  {item.start_time5}
                </span>
              )}
              {item.start_time6 && (
                <span
                  className="time-slot"
                  onClick={() => moveSeat(
                    item.title, item.start_time6, date[item.movie_id], item.screen_number)}
                >
                  {item.start_time6}
                </span>
              )}

              {item.start_time7 && (
                <span
                  className="time-slot"
                  onClick={() => moveSeat(
                    item.title, item.start_time7, date[item.movie_id], item.screen_number)}
                >
                  {item.start_time7}
                </span>
              )}

              {item.start_time8 && (
                <span
                  className="time-slot"
                  onClick={() => moveSeat(
                    item.title, item.start_time8, date[item.movie_id], item.screen_number)}
                >
                  {item.start_time8}
                </span>
              )}

              {item.start_time9 && (
                <span
                  className="time-slot"
                  onClick={() => moveSeat(
                    item.title, item.start_time9, date[item.movie_id], item.screen_number)}
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