import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MainHeader from "../Main/MainHeader";
import "../css/MyPage.css";
import defaultProfile from "../img/기본프로필.png";
import { FaCrown } from "react-icons/fa";

function MyPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loggedInName, setLoggedInName] = useState(null);
    const [profileImg, setProfileImg] = useState(defaultProfile);

    useEffect(() => {
        setLoggedInName(location.state.name);

        fetch(`http://localhost:3000/userprofile/${location.state.id}`)
            .then(res => res.json())
            .then(data => {
                const profilePath = Array.isArray(data) && data.length > 0
                    ? data[0].profile : null;
                if (profilePath) {
                    setProfileImg(`http://localhost:3000${profilePath}`);
                }
            });
    }, [location.state?.id]);

    const handleProfileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profile", file);
        formData.append("userId", location.state.id);

        const res = await fetch("http://localhost:3000/updateProfile", {
            method: "PUT",
            body: formData
        });

        const data = await res.json();

        if (data.success) {
            setProfileImg(`http://localhost:3000${data.profile}`);
        } else {
            alert("업로드 실패");
        }
    };

    function goMyInfoEdit() {
        navigate('/myinfo', { state: { name: location.state.name, id: location.state.id } });
    }

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
    return (
        <>
            <MainHeader />

            <main className="mypage-wrapper">

                 {/* 🔥 Left Menu */}
                <aside className="mypage-menu">
                    <h3 className="menu-title">나의 무비로그</h3>

                    <ul className="menu-list">
                        <li>내 정보</li>
                        <li onClick={goMyInfoEdit}>개인정보 변경</li>
                        <li onClick={goPoint}>멤버십 포인트</li>
                        <li onClick={goReserve}>예매내역</li>
                    </ul>
                </aside>

                <section className="mypage-content">
                    <div className="profile-box">
        
                        <div className="level-top-box">
                            <div className="level-badge">
                                <FaCrown className="level-icon" />
                                <span className="level-name">영화에 미친자</span>
                            </div>
                        </div>

                        <div className="profile-left">
                            <img
                                src={profileImg}
                                alt="프로필"
                                className="profile-img"
                                onClick={() => document.getElementById("profileInput").click()}
                            />
                            <input
                                type="file"
                                id="profileInput"
                                accept="image/*"
                                onChange={handleProfileChange}
                                style={{ display: "none" }}
                            />
                        </div>

                        <div className="profile-right">
                            <h1 className="welcome-text">
                                안녕하세요! <br />{loggedInName}님
                            </h1>

                            <div className="point-box">
                                <span className="point-label">현재 포인트</span>
                                <span className="point-value">98,481 P</span>
                            </div>
                        </div>

                    </div>

                    <div className="history-box">
                        <h2>나의 예매내역</h2>
                        <p className="empty">예매 내역이 없습니다.</p>
                    </div>

                </section>

            </main>
        </>
    );
}

export default MyPage;
