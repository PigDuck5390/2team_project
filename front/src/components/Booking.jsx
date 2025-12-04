import { useNavigate, useParams } from "react-router-dom";
import MainHeader from "./MainHeader";
import "../css/Main.css";
import "../css/Booking.css";

import firstMovie from "../img/주토피아.jpg";

function Booking() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const schedule = [
    { screen: "1관", times: ["10:20", "13:40", "16:00", "18:20", "20:40"] },
    { screen: "2관", times: ["12:00", "14:20", "17:00", "19:20", "21:30"] },
    { screen: "3관", times: ["09:50", "12:10", "14:40", "17:10", "19:50"] },
    { screen: "4관", times: ["11:20", "13:40", "16:10", "18:40", "21:00"] }
  ];

  return (
    <>
      <MainHeader />

      <main className="main-area">
        <div className="book-wrapper">
          <div className="open-book booking-book">
            <div className="book-spine" />

            <div className="page page-left booking-left">

              <img src={firstMovie} alt="영화 포스터" style={{ width: "260px", borderRadius: "6px" }} />

              <div className="desc">
                <h1>주토피아 2</h1>
                <span>
                  더 화려해진 세계, 더 넓어진 주토피아!
                  디즈니의 가장 사랑스러운 콤비 '주디'와 '닉'이 돌아온다!
                  미스터리한 뱀 ‘게리’가 나타난 순간, 주토피아가 다시 흔들리기 시작했다!
                  혼란에 빠진 도시를 구하기 위해 콤비 ‘주디 & 닉’이 잠입 수사에 나서고
                  상상 이상의 진실과 위협을 마주하게 되는데…!
                </span>
              </div>
            </div>

            {/* ---------- 오른쪽 페이지 : 시간표 ---------- */}
            <div className="page page-right booking-right">

              <h3 className="schedule-title">상영 시간표</h3>

              <div className="schedule-box">
                {schedule.map((row, i) => (
                  <div key={i} className="screen-row">
                    <div className="screen-name">{row.screen}</div>

                    <div className="time-list">
                      {row.times.map((t, index) => (
                        <button
                          key={index}
                          className="time-btn"
                          onClick={() =>
                            navigate(`/seat/${movieId}`, {
                              state: {
                                movieId,
                                screen: row.screen,
                                time: t,
                              }
                            })
                          }
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
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
