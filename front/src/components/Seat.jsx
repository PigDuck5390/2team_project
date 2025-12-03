import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainHeader from './MainHeader.jsx';
import '../css/Main.css';
import '../css/Booking.css';

function Seat() {
  const { movieId, screeningId } = useParams();
  const navigate = useNavigate();
  const [screening, setScreening] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `http://localhost:3000/screenings/${screeningId}/seats`
      );
      if (!res.ok) {
        alert('좌석 정보를 불러오지 못했습니다.');
        return;
      }
      const data = await res.json();
      setScreening(data.screening);
      setSeats(data.seats);
    }
    fetchData();
  }, [screeningId]);

  // 행/열 목록 생성 (DB seat_row / seat_col 기준)
  const rows = Array.from(
    new Set(seats.map((s) => s.seat_row))
  ).sort(); // A,B,C...
  const cols = Array.from(
    new Set(seats.map((s) => s.seat_col))
  ).sort((a, b) => a - b);

  function toggleSeat(seatId) {
    setSelected((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  }

  async function handleReserve() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    if (selected.length === 0) {
      alert('좌석을 선택하세요.');
      return;
    }

    const res = await fetch('http://localhost:3000/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        screening_id: Number(screeningId),
        seat_ids: selected,
      }),
    });

    const msg = await res.text();
    if (res.ok) {
      alert(msg);
      navigate('/');
    } else {
      alert(msg);
    }
  }

  if (!screening) return null;

  return (
    <>
      <MainHeader />
      <main className="main-area">
        <div className="book-wrapper">
          <div className="open-book booking-book">
            <div className="book-spine" />

            {/* 왼쪽 페이지: 상영 정보 + 선택 좌석 목록 */}
            <div className="page page-left seat-left">
              <h2 className="seat-title">좌석 선택</h2>
              <p className="seat-meta">
                상영관: {screening.screen_number}관<br />
                상영 ID: {screening.screening_id}
              </p>

              <div className="seat-selected-box">
                <h4>선택한 좌석</h4>
                {selected.length === 0 && <p>선택된 좌석이 없습니다.</p>}
                {selected.length > 0 && (
                  <p>
                    {selected
                      .map((id) => {
                        const seat = seats.find((s) => s.seat_id === id);
                        return seat
                          ? `${seat.seat_row}${seat.seat_col}`
                          : id;
                      })
                      .join(', ')}
                  </p>
                )}
              </div>

              <button className="seat-reserve-btn" onClick={handleReserve}>
                예매 완료
              </button>
            </div>

            {/* 오른쪽 페이지: 좌석 그리드 */}
            <div className="page page-right seat-right">
              <div className="screen-label">SCREEN</div>

              <div className="seat-grid">
                {rows.map((row) => (
                  <div className="seat-row" key={row}>
                    <span className="row-label">{row}</span>
                    {cols.map((col) => {
                      const seat = seats.find(
                        (s) => s.seat_row === row && s.seat_col === col
                      );
                      if (!seat) {
                        return (
                          <div
                            key={col}
                            className="seat seat-empty"
                          />
                        );
                      }
                      const reserved = seat.reserved === 1;
                      const isSelected = selected.includes(seat.seat_id);

                      return (
                        <button
                          key={seat.seat_id}
                          className={`seat ${
                            reserved ? 'reserved' : ''
                          } ${isSelected ? 'selected' : ''}`}
                          disabled={reserved}
                          onClick={() => toggleSeat(seat.seat_id)}
                        >
                          {col}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="seat-legend">
                <span>
                  <span className="legend-box legend-available" /> 선택 가능
                </span>
                <span>
                  <span className="legend-box legend-selected" /> 선택됨
                </span>
                <span>
                  <span className="legend-box legend-reserved" /> 예약 완료
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Seat;
