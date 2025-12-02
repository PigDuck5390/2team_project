import {useNavigate} from 'react-router-dom'

function MainHeader(){
    const navigate = useNavigate();
    
    return(
        <>
            <button onClick={()=>navigate('/movies')}>영화</button>
            <button onClick={()=>navigate('/reservation')}>예매</button>
            <button onClick={()=>navigate('/event')}>이벤트</button>
            <button onClick={()=>navigate('/benefit')}>혜택</button>

            <a href="/login">로그인</a>
            <a href="/join">회원가입</a>
        
        </>
    )
}

export default MainHeader