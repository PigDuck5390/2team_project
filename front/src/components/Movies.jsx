import MainHeader from '../Main/MainHeader.jsx'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function Movies(){
    const location = useLocation()
    const { state : locateName } = location //헤더 로그인 보존
    
    return(
        <>
        <MainHeader />
        <h1>영화</h1>
        </>
    )
}

export default Movies;