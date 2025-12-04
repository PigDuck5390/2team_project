import MainHeader from './MainHeader.jsx'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function Movies(){
    const location = useLocation()
    const { state : locateName } = location
    return(
        <>
        <MainHeader />
        <h1>영화</h1>
        </>
    )
}

export default Movies;