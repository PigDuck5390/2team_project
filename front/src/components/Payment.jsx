import MainHeader from '../Main/MainHeader.jsx'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Payment(){
    const { state : userInfo } = useLocation()
    const reservInfo = useParams()

    const navigate = useNavigate()
    
    const seats = reservInfo.seats.split(",")

    function submit(){ //예매 뻥션
        seats.map(item => {
            fetch("http://localhost:3000/reserv",{
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
        alert("결제에 성공했습니다. 마이페이지에서 내역확인이 가능합니다.")
        navigate("/", { state : {
            name : userInfo.name,
            id : userInfo.id 
            } })
        }

    return(
        <>
            <MainHeader />

            <button onClick={submit}>결제하기</button>
        </>
    )
}

export default Payment