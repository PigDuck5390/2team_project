import MainHeader from '../Main/MainHeader.jsx'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import "../css/Event.css"

function Event(){
    //헤더 로그인 보존 및 유저 정보
    const { state : userInfo } = useLocation()

    const [eventData, setEventData] = useState([])

    useEffect(()=>{
        fetch("http://localhost:3000/eventinfo")
        .then(response=>response.json())
        .then(data=>setEventData(data))
    },[])



    return(
        <>
        <MainHeader />
        
        {eventData.map((item)=>(
            <div key={item.defid}>
                <img src={`http://localhost:3000${item.poster_path}`}
                className="event-poster"
                alt={item.poster_name} />
            </div>  
        ))}
        </>
    )
}

export default Event;