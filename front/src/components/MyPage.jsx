import MainHeader from '../Main/MainHeader.jsx'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function MyPage(){
    const { state : userInfo } = useLocation()
    const navigate = useNavigate();

    function myReserve(){
        navigate("/myreserve", { state : {
          name : userInfo.name,
          id : userInfo.id 
        } } )}
      

    return(
        <>
        <MainHeader />

        <div>
            <div>
                <h2>나의 무비로그</h2>
            </div>
            <div>
                <h1>안녕하세요!<br/>{userInfo.name}님</h1>
            </div>
            <div>
                <h2>나의 예매내역</h2><br/>

            </div>
        </div>
        </>
    )
}

export default MyPage