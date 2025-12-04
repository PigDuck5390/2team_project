import MainHeader from '../Main/MainHeader.jsx'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function MyPage(){
    const location = useLocation()
    const { state : locateName } = location //헤더 로그인 보존

    return(
        <>
        <MainHeader />
        </>
    )
}

export default MyPage