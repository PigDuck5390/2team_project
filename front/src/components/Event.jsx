import MainHeader from './MainHeader.jsx'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function Event(){
    const location = useLocation()
    const { state : locateName } = location 

    return(
        <>
        <MainHeader />
        <h1>이벤트</h1>
        </>
    )
}

export default Event;