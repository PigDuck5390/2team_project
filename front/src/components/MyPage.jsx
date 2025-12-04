import MainHeader from './MainHeader.jsx'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function MyPage(){
    const location = useLocation()
    const { state : locateName } = location

    return(
        <>
        <MainHeader />
        </>
    )
}

export default MyPage