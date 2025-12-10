import MainHeader from '../Main/MainHeader.jsx'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Payment() {
    const navigate = useNavigate()

    const { state: userInfo } = useLocation()
    const reservInfo = useParams()
    
    function submit() { //예매 뻥션
        fetch("http://localhost:3000/reserv", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                date: reservInfo.date,
                movieName: reservInfo.title,
                movieTime: reservInfo.time,
                userName: userInfo.name,
                userId: userInfo.id,
                seat: reservInfo.seats,
                screen: reservInfo.screen
            })
        })
        alert("결제에 성공했습니다. 마이페이지에서 내역확인이 가능합니다.")
        navigate("/", {
            state: {
                name: userInfo.name,
                id: userInfo.id
            }
        })
    }

    return (
        <>
            <MainHeader />
            <div>

                <button onClick={submit}>결제하기</button>
            </div>
        </>
    )
}

export default Payment