import MainHeader from '../Main/MainHeader.jsx'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function Benefit(){
    
    const location = useLocation()
    const { state : locateName } = location
    
    return(
        <>
        <MainHeader />
        <h1>혜택</h1>
        </>
    )
}

export default Benefit;