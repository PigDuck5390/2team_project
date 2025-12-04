import MainHeader from '../Main/MainHeader.jsx'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import firstMovie from '../img/주토피아.jpg'
// import '../css/Reservation.css'

function Reservation() {
    const location = useLocation()
    const navigate = useNavigate()

    const [movieName, setMovieName] = useState('')

    const { state : locateName,
            id : locateId
            } = location

            function inReserv(){
                navigate(`/in_reserv/${movieName}`, { })
            }
   return(
    <>
    
    <MainHeader />
    <h1>주토피아2</h1><br/>
    <img src={firstMovie} style={{width: "300px"}}/><br/>
    <button onClick={(e)=>inReserv(e.target.value)} >15:30</button>
    </>
   )
}

export default Reservation;