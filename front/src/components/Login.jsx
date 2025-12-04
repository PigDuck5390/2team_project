import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import pen from "../img/pen.jpg";
import "../css/Login.css";

function Login() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/userinfo')
            .then(response => response.json())
            .then(data => setUserData(data))
    }, [userData]);

    function handleLogin() {
        const login = userData.find(item =>
            item.id === id && item.pw === pw
        );

        if (login) {
            alert("로그인에 성공했습니다");
            navigate('/', {state : login.name});
        } else {
            alert("계정 정보가 없습니다");
        }
    }

    return (
        <div className="login-page">

            <div className="login-container">
                <h2>로그인</h2>
                <img src={pen} className="login-pen-icon" />

                <label className="login-label">아이디 :</label>
                <input
                    className="login-input"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />

                <label className="login-label">비밀번호 :</label>
                <input
                    className="login-input"
                    type="password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                />

                <button className="login-submit-btn" onClick={handleLogin}>
                    로그인
                </button>

                <Link to="/join" className="login-join-link">
                    회원가입
                </Link>
            </div>

        </div>
    );
}

export default Login;
