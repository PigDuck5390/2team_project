import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react'

import MainHeader from "../Main/MainHeader";
import "../css/Booking.css";

function Booking() {
  const navigate = useNavigate();
  const location = useLocation()
  const { movieId } = useParams(); //영화명

  const [movieData, setMovieData] = useState([])
  
  useEffect(()=>{ //영화정보 조회
    fetch("http://localhost:3000/movieinfo")
    .then(response => response.json())
    .then(data=>setMovieData(data))
  },[movieData])


  return (
    <>
      <MainHeader />

      <div>
        {movieData.map((item)=>( //영화 리스트
          <div key={item.movie_id}>
            <h1>제목 : {item.title}</h1>
            <span>설명 : {item.description}</span><br/>
            <span>상영 시간 : {item.runtime}분</span><br/>
            <span>{item.start_time1}</span><br/>
            <span>{item.start_time2}</span><br/>
            <span>{item.start_time3}</span><br/>
            <span>{item.start_time4}</span><br/>
            <span>{item.start_time5}</span><br/>
            <span>{item.start_time6}</span>

            </div>
        ))}

      </div>
    </>
  );
}

export default Booking;
