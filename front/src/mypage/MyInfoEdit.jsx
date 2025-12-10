import { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainHeader from "../Main/MainHeader";
import "../css/MyInfoEdit.css";

function MyInfo() {
    //헤더 로그인 보존 및 유저 정보
    const location = useLocation();

    const navigate = useNavigate();

    const [newPw, setNewPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [newCardName, setNewCardName] = useState("")
    const [newCard, setNewCard] = useState("")
    const [newCardDate, setNewCardDate] = useState("")
    const [userData, setUserData] = useState([])
    const [cardData, setCardData] = useState([])
    const [bank, setBank] = useState("")

    //유저정보 조회
    useEffect(()=>{
        fetch("http://192.168.0.227:3000/userinfo")
        .then(response=>response.json())
        .then(data=>setUserData(data))
    },[userData])

    //카드정보 조회
    useEffect(()=>{
        fetch("http://192.168.0.227:3000/cardinfo")
        .then(response => response.json())
        .then(data=>setCardData(data))
    },[cardData])

    //내 정보 이동
    const goMyInfo = () => {
        navigate('/mypage', {
            state: {
                name: location.state.name,
                id: location.state.id
            }
        });
    };

    //멤버십 포인트 이동
    const goPoint = () => {
        navigate('/mypoint', {
            state: {
                name: location.state.name,
                id: location.state.id
            }
        });
    };

    //예매내역 이동
    const goReserve = () => {
        navigate('/myreserve', {
            state: {
                name: location.state.name,
                id: location.state.id
            }
        });
    };

    //비밀번호 변경
    const handleChangePassword = () => {
        if (newPw !== confirmPw) {
            alert("비밀번호 확인이 일치하지 않습니다.");
            return;
        }
        fetch("http://192.168.0.227:3000/changePassword", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: location.state.id,
                newPassword: newPw
            })
        })
        alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.")
        navigate('/', { state : {
            name: null,
            id: null
        } 
    })
    };

    //카드 등록
    function cardSubmit() {
        const user = userData.find(item=>item.id == location.state.id)
        fetch("http://192.168.0.227:3000/newcard",{
            method: "POST",
            headers:{"Content-Type" : "application/json"},
            body: JSON.stringify({
                card : newCard,
                cardDate : newCardDate,
                userId : location.state.id,
                defid : user.defid,
                bank: bank,
                name : newCardName
            })
        }
        )
        alert("카드 등록이 완료되었습니다.")
        setNewCard("")
        setNewCardDate("")
        navigate('/myinfo', { state : {
            name: location.state.name,
            id: location.state.id
        }})
    }

    //카드 별명 수정
    function cardNameEdit(defid, name){
        const newName = prompt("새로운 카드 별명을 입력해주세요.", name)
        if(newName){
            fetch("http://192.168.0.227:3000/cardnameupdate",{
                method:"PUT",
                headers:{"content-type":"application/json"},
                body: JSON.stringify({
                    cardId: defid,
                    cardName: newName
                })
            })
        }
    }

    //카드 삭제
    function cardDelete(defid){
        const yes = confirm("진짜 지울거니?")
        if(yes){
            fetch("http://192.168.0.227:3000/carddelete",{
            method: "DELETE",
            headers:{"content-type":'application/json'},
            body: JSON.stringify({defid : defid})
            }
            )
        }
    }


    //------------------------------------------------------//


    return (
        <>
            <MainHeader />
            <main className="mypage-wrapper">
                {/* 🔥 Left Menu */}
                <aside className="mypage-menu">
                    <h3 className="menu-title">나의 무비로그</h3>

                    <ul className="menu-list">
                        <li onClick={goMyInfo}>내 정보</li>
                        <li>개인정보 변경</li>
                        <li onClick={goPoint}>멤버십 포인트</li>
                        <li onClick={goReserve}>예매내역</li>
                    </ul>
                </aside>

                {/* 🔥 Right Content */}
                <div className="myinfo-wrapper">
                    <h1 className="myinfo-title">개인정보 변경</h1>
                    <div className="myinfo-card">

                        {/* 비밀번호 변경 */}
                        <section className="info-section">
                            <h2 className="section-title">비밀번호 변경</h2>
                            <div className="input-group">

                                <label>새 비밀번호</label>
                                <input
                                    type="password"
                                    value={newPw}
                                    onChange={(e) => setNewPw(e.target.value)}
                                    placeholder="새 비밀번호 입력"
                                />
                            </div>

                            <div className="input-group">

                                <label>비밀번호 확인</label>
                                <input
                                    type="password"
                                    value={confirmPw}
                                    onChange={(e) => setConfirmPw(e.target.value)}
                                    placeholder="비밀번호 확인"
                                />
                            </div>

                            <button className="submit-btn"
                            onClick={handleChangePassword}>
                                변경하기
                            </button>
                        </section>

                        {/* 카드 등록 */}
                        <section className="info-section">
                            <h2 className="section-title">카드 등록</h2>

                            <div className="input-group">
                                <label>카드 별명</label>
                                <input 
                                type="text" 
                                placeholder="카드 별명"
                                value={newCardName} 
                                onChange={(e)=>setNewCardName(e.target.value)}/>
                            </div>

                            <div className="input-group">
                                <label>카드 번호</label>
                                <input 
                                type="text" 
                                placeholder="0000-0000-0000-0000"
                                value={newCard} 
                                onChange={(e)=>setNewCard(e.target.value)}/>
                            </div>

                            <div className="input-group">
                                <label>유효기간</label>
                                <input 
                                type="text" 
                                placeholder="MM/YY"
                                value={newCardDate}
                                onChange={(e)=>setNewCardDate(e.target.value)} />
                            </div>
                            
                              <div className="input-group">
                                <label>카드사</label>
                                <select value={bank} onChange={(e)=>setBank(e.target.value)}>
                                    <option value="">은행 선택</option>
                                    <option value="국민은행">국민은행</option>
                                    <option value="신한은행">신한은행</option>
                                    <option value="우리은행">우리은행</option>
                                    <option value="지역농축협">지역농축협</option>
                                    <option value="농협은행">농협은행</option>
                                    <option value="카카오뱅크">카카오뱅크</option>
                                    <option value="토스">토스</option>
                                    <option value="부산은행">부산은행</option>
                                    <option value="IBK기업은행">IBK기업은행</option>
                                </select>
                            </div>

                            <button className="submit-btn" onClick={cardSubmit}>카드 등록</button>
                        </section>

                        {/* 카드 리스트 */}
                        <section className="info-section">
                        <h2 className="section-title">내 카드</h2>

                        <div className="card-list">
                            {cardData
                            .filter(item => item.user_id == location.state.id)
                            .map((item) => (
                                <div className="card-item" key={item.card_defid}>
                                
                                <div className="card-top">
                                    <span className="card-name">{item.card_name}</span>

                                    <button className="edit-btn"
                                    onClick={() => cardNameEdit(item.card_defid, item.card_name)}>
                                    카드 별명 수정
                                    </button>
                                </div>

                                <div className="card-info">
                                    <span>카드사 : {item.card_bank}</span><br/>
                                    <span>카드 번호 : {item.card_num}</span><br/>
                                    <span>만료일 : {item.card_date}</span><br/>
                                </div>

                                <button className="delete-btn"
                                    onClick={() => cardDelete(item.card_defid)}>
                                    삭제
                                </button>

                                </div>
                            ))}
                        </div>
                        </section>



                    </div>

                </div>
            </main>
        </>
    );
}

export default MyInfo;
