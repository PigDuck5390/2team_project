import MainHeader from "../Main/MainHeader";
import { useState, useEffect } from "react"
import "../css/Movies.css";


function Movies() {

  const [movies, setMovies] = useState([]);

  //영화정보 조회 (순위 미반영)
  useEffect(()=>{
    fetch("http://localhost:3000/movies")
      .then(res => res.json())
      .then(data => setMovies(data))
  },[])

  
  //-----------------------------------------------------//

  
  return (
    <>
      <MainHeader />

      <main className="movies-area">
        {movies.map((movie) => (
          <section key={movie.movie_id} className="movie-section">
            <div className="movie-poster-box">
              <img src={`http://localhost:3000${movie.poster}`}
              alt={movie.title} />
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
