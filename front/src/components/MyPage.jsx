import MainHeader from '../Main/MainHeader.jsx'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function MyPage(){
    const location = useLocation()
    const navigate = useNavigate();
    const { state : locateName } = location
    function myReserve(){
        navigate("/myreserve", { state : locateName })
      }

    return(
        <>
        <MainHeader />

        <div>
            <div>
                <h2>나의 무비로그</h2>
            </div>
            <div>
                <h1>안녕하세요!<br/>{locateName}님</h1>
            </div>
            <div>
                <h2>나의 예매내역</h2><br/>

            </div>
        </div>
        </>
    )
}

export default MyPage