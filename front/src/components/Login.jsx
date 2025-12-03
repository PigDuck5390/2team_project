import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    async function loginUser() {
        const res = await (fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, pw })
        }));
        if (res.ok) {
            alert("로그인 성공");
            navigate("/");
        } else {
            alert(await res.text());
        }
    }
    function findId(){

    }
    function findPw(){

    }

    return (
        <div>
            <h1> </h1>
            <span>아이디: </span><input onChange={e => setId(e.target.value)} /><p/>
            <span>비밀번호: </span><input type="password" onChange={e => setPw(e.target.value)} /><p/>
            <button onClick={findId}>아이디 찾기</button>
            <button onClick={findPw}>비밀번호 찾기</button>
            <button onClick={loginUser}>로그인</button>
        </div>
    );
}

export default Login;
