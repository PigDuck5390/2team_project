import {Link, useNavigate} from 'react-router-dom'
import {useState, useEffect } from 'react'

function Join() {
    const navigate = useNavigate();

    const[name, setName] = useState("");
    const[id, setId] = useState("");
    const[pw, setPw] = useState("");
    const[checkPw, setCheckPw] = useState("");
    const[userData, setUserData] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:3000/userinfo")
        .then(response=>response.json())
        .then(data=>setUserData(data))
    },[userData])

    function handleJoin() {
        if(id != "" && pw !="" && name !=""){
            if(!userData.some(item=>item.id == id)){
                if(pw == checkPw){
                    fetch("http://localhost:3000/join",{
                        method:"POST",
                        headers:{"content-type" : "application/json"},
                        body : JSON.stringify({
                            userName : name,
                            userId : id,
                            userPw : pw
                        })
                    })
                    alert("회원가입이 완료되었습니다. 로그인 화면으로 이동합니다")
                    navigate("/login")
                }else{
                    alert("비밀번호 확인이 다릅니다")
                }
            }else{
                alert("중복된 아이디입니다.")
            }
        }else{
            alert("입력하지 않은 정보가 있습니다")
        }
        }

    return (
        <>
        <h2>회원가입</h2>

        <span>이름 : </span>
        <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)} />

        <span>아이디 : </span>
        <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)} />

        <span>비밀번호 : </span>
        <input 
        type = "password"
        value={pw}
        onChange={(e)=>setPw(e.target.value)}/>

        
        <span>비밀번호 확인 : </span>
        <input 
        type = "password"
        value={checkPw}
        onChange={(e)=>setCheckPw(e.target.value)}/>

        <button onClick={handleJoin}>회원가입</button>
        <div style={{marginTop: '15px'}}></div>
        <Link to="/login">로그인 화면으로 이동</Link>
        </>
    );
}   

export default Join;

