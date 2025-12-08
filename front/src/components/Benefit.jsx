import MainHeader from '../Main/MainHeader.jsx'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function Benefit(){
    //헤더 로그인 보존 및 유저 정보
    const { state : userInfo } = useLocation()
    
    return(
        <>
            <MainHeader />
            <h1>혜택</h1>
        </>
    )
}

export default Benefit;