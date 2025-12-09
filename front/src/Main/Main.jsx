import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import MainHeader from '../Main/MainHeader.jsx'
import '../css/Main.css'

function Main() {
  const navigate = useNavigate();
  const { state: userInfo } = useLocation()

  const [movieData, setMovieData] = useState([])
  const [page, setPage] = useState(0);

  useEffect(() => { //영화정보 조회
    fetch("http://localhost:3000/movieinfo")
      .then(response => response.json())
      .then(data => setMovieData(data))
  }, [movieData])

  // ✅ reserv_count 기준 내림차순 정렬 + 페이지별 4개씩 잘라 쓰기
  const sortedMovies = [...movieData].sort(
    (a, b) => b.reserv_count - a.reserv_count
  );
  const pageSize = 4;
  const startIndex = page * pageSize;
  const pageMovies = sortedMovies.slice(startIndex, startIndex + pageSize);

  // 안전하게 자리 뽑아오기 (없을 수도 있으니까)
  const leftTop = pageMovies[0]; // 1위, 5위, 9위 ...
  const leftBottom = pageMovies[2]; // 3위, 7위 ...
  const rightTop = pageMovies[1]; // 2위, 6위 ...
  const rightBottom = pageMovies[3]; // 4위, 8위 ...

  const maxPage = Math.max(0, Math.ceil(sortedMovies.length / pageSize) - 1);

  const Reserve = (movie_id) => {
    navigate('/reservation', {
      state: {
        movieId: movie_id,
        name: userInfo?.name,
        id: userInfo?.id
      }
    });
  };

  return (
    <>
      <MainHeader />

      <main className="main-area">
        <div className="book-wrapper">
          <div className="open-book">
            <div className="book-spine" />

            {/* ===== 왼쪽 페이지 (1위 / 3위, 5위 / 7위 ...) ===== */}
            <div className="page page-left">
              {/* 상단: 현재 페이지의 첫 번째 순위 (1위, 5위, 9위 ...) */}
              {leftTop && (
                <div className="movie-row">
                  <div className="poster-wrap">
                    <img
                      src={`http://localhost:3000${leftTop.poster}`}
                      alt={leftTop.title}
                      className="poster-img"
                    />
                    {/* ✅ 순위 숫자: 페이지에 따라 1,5,9... */}
                    <div className="rank-badge">
                      {`${startIndex + 1}위`}
                    </div>
                  </div>

                  <div className="desc">
                    <h1>{leftTop.title}</h1>
                    <span>{leftTop.short_description}</span>
                  </div>

                  <button
                    className="quick-reserv"
                    onClick={() => Reserve(leftTop.movie_id)}
                  >
                    바로 예매하기
                  </button>
                </div>
              )}

              {/* 하단: 현재 페이지의 세 번째 순위 (3위, 7위, 11위 ...) */}
              {leftBottom && (
                <div className="movie-row">
                  <div className="poster-wrap">
                    <img
                      src={`http://localhost:3000${leftBottom.poster}`}
                      alt={leftBottom.title}
                      className="poster-img"
                    />
                    <div className="rank-badge">
                      {`${startIndex + 3}위`}
                    </div>
                  </div>

                  <div className="desc">
                    <h1>{leftBottom.title}</h1>
                    <span>{leftBottom.short_description}</span>
                  </div>

                  <button
                    className="quick-reserv"
                    onClick={() => Reserve(leftBottom.movie_id)}
                  >
                    바로 예매하기
                  </button>
                </div>
              )}
            </div>

            {/* ===== 오른쪽 페이지 (2위 / 4위, 6위 / 8위 ...) ===== */}
            <div className="page page-right">
              {/* 상단: 두 번째 순위 (2위, 6위, 10위 ...) */}
              {rightTop && (
                <div className="movie-row">
                  <div className="poster-wrap">
                    <img
                      src={`http://localhost:3000${rightTop.poster}`}
                      alt={rightTop.title}
                      className="poster-img"
                    />
                    <div className="rank-badge">
                      {`${startIndex + 2}위`}
                    </div>
                  </div>

                  <div className="desc">
                    <h1>{rightTop.title}</h1>
                    <span>{rightTop.short_description}</span>
                  </div>

                  <button
                    className="quick-reserv"
                    onClick={() => Reserve(rightTop.movie_id)}
                  >
                    바로 예매하기
                  </button>
                </div>
              )}

              {/* 하단: 네 번째 순위 (4위, 8위, 12위 ...) */}
              {rightBottom && (
                <div className="movie-row">
                  <div className="poster-wrap">
                    <img
                      src={`http://localhost:3000${rightBottom.poster}`}
                      alt={rightBottom.title}
                      className="poster-img"
                    />
                    <div className="rank-badge">
                      {`${startIndex + 4}위`}
                    </div>
                  </div>

                  <div className="desc">
                    <h1>{rightBottom.title}</h1>
                    <span>{rightBottom.short_description}</span>
                  </div>

                  <button
                    className="quick-reserv"
                    onClick={() => Reserve(rightBottom.movie_id)}
                  >
                    바로 예매하기
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ===== 책 양옆 하단 동그란 페이지 넘김 버튼 ===== */}
          <button
            className={`page-arrow page-prev ${page === 0 ? "disabled" : ""}`}
            onClick={() => page > 0 && setPage(page - 1)}
            aria-label="이전 페이지"
          />

          <button
            className={`page-arrow page-next ${page === maxPage ? "disabled" : ""
              }`}
            onClick={() => page < maxPage && setPage(page + 1)}
            aria-label="다음 페이지"
          />
        </div>
      </main>
    </>
  );


}



export default Main