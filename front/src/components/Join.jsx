import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'

function Join() {
    const navigate = useNavigate();

    const[name, setName] = useState("");
    const[id, setId] = useState("");
    const[pw, setPw] = useState("");

    function handleJoin() {
        if(!id || !pw) {
            alert("아이디와 비밀번호를 모두 입력해주세요.");
            return;
        }       
        const userObject = { userId: id, userPw: pw};
        localStorage.setItem('user', JSON.stringify(userObject));
        alert("회원 가입이 완료되었습니다. 로그인 페이지로 이동 합니다.");
        navigate('/login');
    }
    return (
        <>
        <h2>회원가입</h2>
        <input type="text" onChange={(e) => setId(e.target.value)} />
        <input style={{marginLeft: '5px'}} type = "password" onChange={(e)=>setPw(e.target.value)}/>
        <button onClick={handleJoin}>회원가입(Join)</button>
        <div style={{marginTop: '15px'}}></div>
        <Link to="/login">로그인 화면으로 이동</Link>
        </>
    );
}   

export default Join;

