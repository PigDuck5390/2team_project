import MainHeader from '../Main/MainHeader.jsx'
import { useState, useEffect } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import '../css/Seat.css'

function Seat(){
    const navigate = useNavigate()
  
    const { state : userInfo } = useLocation()
    const reservInfo = useParams()

    // console.log(reservInfo)

    const seats = 
    ["A1", "A2", "A3", "A4", "A5", "A6",
        "B1", "B2", "B3", "B4", "B5", "B6",
        "C1", "C2", "C3", "C4", "C5", "C6",
        "D1", "D2", "D3", "D4", "D5", "D6",
        "E1", "E2", "E3", "E4", "E5", "E6",
        "F1", "F2", "F3", "F4", "F5", "F6",
    ]

    const [seatData, setSeatData] = useState([])

    useEffect(() => { //예매정보 조회
      fetch('http://localhost:3000/seatlist')
        .then(response => response.json())
        .then(data => setSeatData(data))
    }, [seatData]);

    const [selectedSeats, setSelectedSeats] = useState([]);

    const toggleSeat = (seat) => { //자리선택 뻥션
      if(selectedSeats.includes(seat)) {
        setSelectedSeats(selectedSeats.filter(s => s !== seat));
      }else{
        setSelectedSeats([...selectedSeats, seat]);
      }
    };

    function submit(){ //예매 뻥션
      if(!selectedSeats[0]){
        alert("좌석을 선택해주세요.")
        return;
      }
      selectedSeats.map(item =>
        {fetch("http://localhost:3000/reserv",{
          method: "POST",
          headers : {"content-type" : "application/json"},
          body : JSON.stringify({
            date : reservInfo.date,
            movieName : reservInfo.title,
            movieTime : reservInfo.time,
            userName : userInfo.name,
            userId : userInfo.id,
            seat : item,
            screen : reservInfo.screen
          })
        }
        )
        }
      
      )
      alert("예매 성공했습니다. 마이페이지에서 예매내역을 확인 가능합니다.")
      navigate("/", { state : {
          name : userInfo?.name,
          id : userInfo?.id 
        } })
    }

    return(
      <>
        <MainHeader />
        

<div className="seat-wrapper">
  
  {/* 좌측 영역 */}
  <div className="left-area">
    <h1 className='screen'>{reservInfo.screen}관 : SCREEN</h1>
    <div className="seat-container">
      {seats.map(seat => (
        <div
          key={seat}
          className={`seat ${selectedSeats.includes(seat) ? "selected" : ""}`}
          onClick={() => toggleSeat(seat)}
        >
          {seat}
        </div>
      ))}
    </div>
  </div>

  {/* 우측 영역 */}
  <div className="right-area">
    <div className="movie-info">
      <p><strong>상영관 :</strong> {reservInfo.screen}관</p>
      <p><strong>영화 제목 :</strong> {reservInfo.title}</p>
      <p><strong>날짜 :</strong> {reservInfo.date}</p>
      <p><strong>시간 :</strong> {reservInfo.time}</p>
    </div>

    <button className="reserve-btn" onClick={submit}>예매하기</button>
  </div>

</div>

      </>
    )
}

export default Seat