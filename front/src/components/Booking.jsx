import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react'

import MainHeader from "../Main/MainHeader";
import "../css/Main.css";
import "../css/Booking.css";

import firstMovie from "../img/주토피아.jpg";

function Booking() {
  const navigate = useNavigate();
  const location = useLocation()
  const { movieId } = useParams();

  const [movieData, setMovieData] = useState([])
  const { state : locateName } = location

  use
  return (
    <>
      <MainHeader />

      <div>

        <h1>주토피아</h1>
        <span>설명</span><br/>

        <span> q관 변수q 관</span>
        <span> q시간 변수q </span>
        <span> q시간 변수q </span>
        <span> q시간 변수q </span>
        <span> q시간 변수q </span>
        <span> q시간 변수q </span>
        <span> q시간 변수q </span>
        <br/>

        <span> q관 변수q 관 </span>
        <span> q시간 변수q </span>
        <span> q시간 변수q </span>
        <span> q시간 변수q </span>
        <span> q시간 변수q </span>
        <span> q시간 변수q </span>
        <span> q시간 변수q </span>
        <br/>

      </div>
    </>
  );
}

export default Booking;
