import MainHeader from '../Main/MainHeader.jsx'
import { useState, useEffect } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import '../css/Seat.css'

function Seat(){
    const navigate = useNavigate()
  
    const { state : userInfo } = useLocation()
    const reservInfo = useParams()
    
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [reservedSeats, setReservedSeats] = useState([])
    const [seatData, setSeatData] = useState([])
    const [personnel, setPersonnel] = useState(0)

    const seats = 
    ["A1", "A2", "A3", "A4", "A5", "A6",
        "B1", "B2", "B3", "B4", "B5", "B6",
        "C1", "C2", "C3", "C4", "C5", "C6",
        "D1", "D2", "D3", "D4", "D5", "D6",
        "E1", "E2", "E3", "E4", "E5", "E6",
        "F1", "F2", "F3", "F4", "F5", "F6",
    ]

    //예매정보 조회
    useEffect(() => {
      fetch('http://localhost:3000/seatlist')
        .then(response => response.json())
        .then(data => setSeatData(data))
    }, []);

    //이미 예매된 좌석 구분 및 제한
    useEffect(()=>{
        const seatNums = seatData.filter(item =>
          item.movie_name == reservInfo.title &&
          item.screen_num == reservInfo.screen &&
          item.date.split('T')[0] == reservInfo.date.split('T')[0] &&
          item.time == reservInfo.time
          )
          .flatMap(item =>
            item.seat_num.includes(',') 
              ? item.seat_num.split(',') 
              : [item.seat_num]
          )
        setReservedSeats(seatNums)
    },[seatData])

    //자리 선택
    function toggleSeat(seat){
      if(selectedSeats.includes(seat)) {
        setSelectedSeats(selectedSeats.filter(s => s !== seat));
      }else if(selectedSeats.length < personnel){
        setSelectedSeats([...selectedSeats, seat]);
      }else{
        alert("선택한 인원수보다 선택한 좌석이 많습니다")
      }
    }

    //예매하기
    function submit(){
      if(!selectedSeats[0]){
        alert("좌석을 선택해주세요.")
        return;
      }
      
      const payment = confirm("결제 페이지로 이동하시겠습니까?")
      if(payment){
        navigate(
          `/payment/${reservInfo.title}/${reservInfo.time}
          /${reservInfo.date}/${reservInfo.screen}/${selectedSeats}`,
            { state : {
                name : userInfo.name,
                id : userInfo.id 
              } 
            }
        )
      }
    }

    //인원수 증가
    function personCount(){
      if(personnel >= seats.length-reservedSeats.length){
        alert("인원수가 잔여석을 초과할 수 없습니다.")
        return;
      }
      setPersonnel(item=>item+=1)
    }

    //인원수 감소
    function personDecount(){
      if(personnel <= 0){
        alert("인원수가 0보다 작을 수 없습니다.")
        return;
      }
      if(selectedSeats.length < personnel){
        setPersonnel(item=>item-=1)
      }else{
        alert("먼저 좌석 선택을 취소해주세요.")
      }
    }


    return(
      <>
        <MainHeader />
        <div className="seat-wrapper">
          
          {/* 좌측 영역 */}
          <div className="left-area">
            <h1 className='screen'>{reservInfo.screen}관 : SCREEN</h1>
            <div className="seat-container">
              {seats.map(seat => { 
                const isSelected = selectedSeats.includes(seat);
                const isReserved = reservedSeats.includes(seat);
              
                  return (
                    <div
                      key={seat}
                      className={`seat
                        ${isSelected ? "selected" : ""}
                        ${isReserved ? "reserved": ""}`
                      }
                      onClick={() =>{ 
                        if (!isReserved) toggleSeat(seat)
                        }
                      }
                    >
                      {seat}
                    </div>
                    );
                  }
                )
              }
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
            <button onClick={personCount}>+</button>
            <p>인원수 : {personnel}</p>
            <button onClick={personDecount}>-</button>
            <button className="reserve-btn" onClick={submit}>예매하기</button>
          </div>

        </div>

      </>
    )
}

export default Seat