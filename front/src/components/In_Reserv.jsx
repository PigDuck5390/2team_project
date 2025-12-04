import MainHeader from './MainHeader.jsx'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../css/In_Reserv.css'

function In_Reserv(){
    const location =- useLocation()

    const { state : locateName,
            id : locateId
            } = location

    const seats = 
    ["A1", "A2", "A3", "A4", "A5", "A6",
        "B1", "B2", "B3", "B4", "B5", "B6",
        "C1", "C2", "C3", "C4", "C5", "C6",
        "D1", "D2", "D3", "D4", "D5", "D6",
        "E1", "E2", "E3", "E4", "E5", "E6",
        "F1", "F2", "F3", "F4", "F5", "F6",
    ]

    const [seatData, setSeatData] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/seatlist')
            .then(response => response.json())
            .then(data => setSeatData(data))
    }, [seatData]);


    const [selectedSeats, setSelectedSeats] = useState([]);

    const toggleSeat = (seat) => {
        if(selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
            } else {
                    setSelectedSeats([...selectedSeats, seat]);
            }
    };

    function submit(){
        console.log(seatData)
    }

    return(
        <>
        <MainHeader />
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
        <button onClick={submit}>예매</button>
        </>
    )
}

export default In_Reserv