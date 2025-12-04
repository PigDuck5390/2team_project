import MainHeader from '../Main/MainHeader.jsx'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Reservation() {
    const location = useLocation()
    const navigate = useNavigate()
    const [movieData, setMovieData] = useState([])

    const { state : locateName } = location //헤더 로그인 보존

    useEffect(()=>{ //영화정보 조회
      fetch("http://localhost:3000/movieinfo")
      .then(response => response.json())
      .then(data=>setMovieData(data))
    },[movieData])

    function moveSeat(title, time){ //좌석선택 이동
      navigate(`/seat/${title}/${time}`)
    }

   return(
    <>
    <MainHeader />
        {movieData.map((item)=>(
          <div key={item.movie_id}>
            <img alt="poster" />
            <h1>제목 : {item.title}</h1>
            <span>설명 : {item.description}</span><br/>
            <span>상영 시간 : {item.runtime}분</span><br/>
            <span onClick={()=> moveSeat(item.title, item.start_time1)}>{item.start_time1}</span><br/>
            <span onClick={()=> moveSeat(item.title, item.start_time2)}>{item.start_time2}</span><br/>
            <span onClick={()=> moveSeat(item.title, item.start_time3)}>{item.start_time3}</span><br/>
            <span onClick={()=> moveSeat(item.title, item.start_time4)}>{item.start_time4}</span><br/>
            <span onClick={()=> moveSeat(item.title, item.start_time5)}>{item.start_time5}</span><br/>
            <span onClick={()=> moveSeat(item.title, item.start_time6)}>{item.start_time6}</span>
          </div>
        ))}
    </>
   )
}

export default Reservation;