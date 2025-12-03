import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pen from "../img/pen.jpg";
import "../css/Join.css";

function Join() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    async function JoinUser() {
        const res = await fetch("http://localhost:3000/join", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, id, pw })
        });

        if (res.ok) {
            alert("회원가입 완료");
            navigate("/login");
        } else {
            alert(await res.text());
        }
    }

    return (
        <div className="join-paper">
            <img src={pen} className="pen-icon" />

            <label>이름 :</label>
            <input className="input-box" onChange={e => setName(e.target.value)} />

            <label>아이디 :</label>
            <input className="input-box" onChange={e => setId(e.target.value)} />

            <label>비밀번호 :</label>
            <input className="input-box" type="password" onChange={e => setPw(e.target.value)} />

            <button className="join-btn" onClick={JoinUser}>회원가입</button>
        </div>
    );
}

export default Join;
