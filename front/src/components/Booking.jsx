import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainHeader from './MainHeader.jsx';
import '../css/Main.css';
import '../css/Booking.css';

function Booking() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [screenings, setScreenings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:3000/movies/${movieId}/screenings`);
      if (!res.ok) {
        alert('상영 정보를 불러오지 못했습니다.');
        return;
      }
      const data = await res.json();
      setMovie(data.movie);
      setScreenings(data.screenings);
    }
    fetchData();
  }, [movieId]);

  function formatDateTime(dt) {
    const d = new Date(dt);
    const date = `${d.getMonth() + 1}월 ${d.getDate()}일`;
    const time = `${String(d.getHours()).padStart(2, '0')}:${String(
      d.getMinutes()
    ).padStart(2, '0')}`;
    return `${date} ${time}`;
  }

  if (!movie) return null;

  return (
    <>
      <MainHeader />
      <main className="main-area">
        <div className="book-wrapper">
          <div className="open-book booking-book">
            <div className="book-spine" />

            {/* 왼쪽 페이지: 영화 정보 */}
            <div className="page page-left booking-left">
              <h2 className="booking-title">{movie.title}</h2>
              <p className="booking-desc">{movie.description}</p>
              <p className="booking-meta">
                장르: {movie.genre || '정보 없음'} / 러닝타임: {movie.runtime}분
              </p>
            </div>

            {/* 오른쪽 페이지: 시간표 */}
            <div className="page page-right booking-right">
              <h3 className="schedule-title">상영 시간표</h3>
              <div className="schedule-list">
                {screenings.length === 0 && <p>등록된 상영 시간이 없습니다.</p>}
                {screenings.map((s) => (
                  <button
                    key={s.screening_id}
                    className="schedule-btn"
                    onClick={() =>
                      navigate(`/booking/${movieId}/seat/${s.screening_id}`)
                    }
                  >
                    {s.screen_number}관 / {formatDateTime(s.start_time)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Booking;
