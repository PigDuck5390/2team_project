import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Login() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [userData, setUserData] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3000/userinfo')
        .then(response=>response.json())
        .then(data=>setUserData(data))
    },[userData])

    function handleLogin(){
        const login = userData.find(item=>
            item.id == id && item.pw == pw)

        if(login){
            alert("로그인에 성공했습니다")
            navigate('/')
            }else{
                alert("계정 정보가 없습니다")
            }
    }

    return (
        <>
            <h2>로그인</h2>
            <span>아이디 : </span>
            <input
                placeholder="ID입력"
                value={id}
                onChange={(e) => setId(e.target.value)} />


                <br/><span>비밀번호 : </span>
            <input
                style={{ marginLeft: '5px' }}
                type="password"
                placeholder="PW 입력"
                value={pw}
                onChange={(e) => setPw(e.target.value)} />

            <button onClick={handleLogin}>Login</button>
            <div style={{ marginTop: '10px' }}>
                <Link to='/Join'>회원가입</Link>
            </div>
        </>
    )

}


export default Login;