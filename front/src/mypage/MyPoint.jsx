import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MainHeader from "../Main/MainHeader";

function MyPoint() {
    const navigate = useNavigate();
    const location = useLocation();
    
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
    const goMyPage = () => {
        navigate('/mypage', {
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

                <aside className="mypage-menu">
                    <h3 className="menu-title">나의 무비로그</h3>

                    <ul className="menu-list">
                        <li onClick={goMyPage}>내 정보</li>
                        <li onClick={goMyInfoEdit}>개인정보 변경</li>
                        <li onClick={goPoint}>멤버십 포인트</li>
                        <li onClick={goReserve}>예매내역</li>
                    </ul>
                </aside>

            </main >
        </>
    )
}

export default MyPoint;