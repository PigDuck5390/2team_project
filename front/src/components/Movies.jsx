import MainHeader from "../Main/MainHeader";
import "../css/Movies.css";
import poster1 from "../img/주토피아.jpg";
import poster2 from "../img/주술회전.jpg";
import poster3 from "../img/윗집사람들.jpg";
import poster4 from "../img/정보원.jpg";

function Movies() {
  const movies = [
    {
      id: 1,
      title: "주토피아 2",
      description:
        "더 화려해진 세계, 더 넓어진 주토피아! ... (생략)",
      runtime: 108,
      poster: poster1,
    },
    {
      id: 2,
      title: "주술회전 극장판",
      description: "저주와 전투의 세계로 들어가는 스릴 넘치는 이야기...",
      runtime: 102,
      poster: poster2,
    },
    {
      id: 3,
      title: "윗집 사람들",
      description: "평범한 일상 속 미스터리를 그린 감성 드라마...",
      runtime: 110,
      poster: poster3,
    },
    {
      id: 4,
      title: "정보원",
      description: "첩보 액션과 스릴을 담아낸 긴장감 넘치는 작품...",
      runtime: 115,
      poster: poster4,
    },
  ];

  return (
    <>
      <MainHeader />

      <main className="movies-area">
        {movies.map((movie) => (
          <section key={movie.id} className="movie-section">
            <div className="movie-poster-box">
              <img src={movie.poster} alt={movie.title} />
            </div>

            <div className="movie-info-box">
              <h1 className="movie-title">{movie.title}</h1>
              <p className="movie-desc">{movie.description}</p>
              <p className="movie-meta">러닝타임 : {movie.runtime}분</p>

              <div className="movie-extra-box">
                <div className="chart">그래프 / 연령분포</div>
              </div>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}

export default Movies;
