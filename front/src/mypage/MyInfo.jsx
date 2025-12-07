import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainHeader from "../Main/MainHeader";
import "../css/MyInfo.css";

function MyInfo() {
    const location = useLocation();
    const navigate = useNavigate();

    const [newPw, setNewPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");

    // 🔥 메뉴 이동 함수 (MyPage와 동일)
    const goMyInfo = () => {
        navigate('/myinfo', {
            state: {
                name: location.state.name,
                id: location.state.id
            }
        });
    };

    const goPoint = () => {
        navigate('/mypoint', {
            state: {
                name: location.state.name,
                id: location.state.id
            }
        });
    };

    const goReserve = () => {
        navigate('/myreserve', {
            state: {
                name: location.state.name,
                id: location.state.id
            }
        });
    };

    const handleChangePassword = () => {
        if (newPw !== confirmPw) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        fetch("http://localhost:3000/changePassword", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: location.state.id,
                newPassword: newPw
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) alert("비밀번호가 변경되었습니다.");
                else alert("비밀번호 변경 실패");
            });
    };

    return (
        <>
            <MainHeader />

            <main className="mypage-wrapper">

                {/* 🔥 Left Menu */}
                <aside className="mypage-menu">
                    <h3 className="menu-title">나의 무비로그</h3>

                    <ul className="menu-list">
                        <li onClick={goMyInfo}>내 정보</li>
                        <li onClick={goPoint}>멤버십 포인트</li>
                        <li onClick={goReserve}>예매내역</li>
                    </ul>
                </aside>

                {/* 🔥 Right Content */}
                <div className="myinfo-wrapper">

                    <h1 className="myinfo-title">내 정보</h1>

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

                            <button className="submit-btn" onClick={handleChangePassword}>
                                변경하기
                            </button>
                        </section>

                        {/* 카드 등록 */}
                        <section className="info-section">
                            <h2 className="section-title">카드 등록</h2>

                            <div className="input-group">
                                <label>카드 번호</label>
                                <input type="text" placeholder="0000-0000-0000-0000" />
                            </div>

                            <div className="input-group">
                                <label>유효기간</label>
                                <input type="text" placeholder="MM/YY" />
                            </div>

                            <button className="submit-btn">카드 등록</button>
                        </section>

                    </div>

                </div>
            </main>
        </>
    );
}

export default MyInfo;
