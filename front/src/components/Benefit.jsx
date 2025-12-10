import MainHeader from '../Main/MainHeader.jsx'
import { useState, useEffect } from 'react'

import '../css/Benefit.css'

function Benefit(){
    const [benefitData, setBenefitData] = useState([])

    //혜택 정보 조회
    useEffect(()=>{
        fetch("http://192.168.0.227:3000/benefitinfo")
        .then(response =>response.json())
        .then(data => setBenefitData(data))
    },[])
    
    return(
        <>
            <MainHeader />
            
            {/* 혜택 포스터 */}
            {benefitData.map((item)=>(
                <div key={item.defid}>
                    <img src={`http://192.168.0.227:3000${item.poster_path}`}
                    className="benefit-poster"
                    alt={item.poster_name} />
                </div>
                    )
                )
            }
        </>
    )
}

export default Benefit;