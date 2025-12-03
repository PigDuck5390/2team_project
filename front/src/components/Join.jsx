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
import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'

function Join() {
    const navigate = useNavigate();

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
        navigate('/');
    }
    return (
        <>
        <h2>회원가입</h2>
        <input
            type="text"
            placeHolder="사용할 ID입력"
            onChange={(e) => setId(e.target.value)} />
        <input
        style={{marginLeft: '5px'}}
        type = "password"
        placeHolder = "사용할 PW 입력"
        onChange={(e)=>setPw(e.target.value)}/>
        <button onClick={handleJoin}>회원가입(Join)</button>
        <div style={{marginTop: '15px'}}></div>
        <Link to="/">로그인 화면으로 이동</Link>
        </>
    );
}   

export default Join;

