import { useNavigate } from "react-router-dom"

import '../css/MainHeader.css'

function MainHeader() {

    const navigate = useNavigate();

  return (
    <div className="header-wrapper">
      {/* 🔼 광고 배너 */}
      <div className="header-ad">
        <div className="header-ad-inner">
          <div className="header-ad-content">
            <span className="header-ad-tag">AD</span>
            <div className="header-ad-text">
              <strong>오늘의 특별 상영</strong>
              <span>지금 MOVIELOG에서 예매하고 다양한 혜택을 만나보세요.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🔽 헤더 */}
      <header className="main-header">
        <div className="header-top">
          <div className="header-top-inner">
            <div className="header-top-left">
              <span>VIP LOUNGE</span>
              <span>멤버십</span>
              <span>고객센터</span>
            </div>
            <div className="header-top-right">
              <button onClick={()=>navigate("/login")}>로그인</button>
              <button onClick={()=>navigate("/join")}>회원가입</button>
            </div>
          </div>
        </div>

        <div className="header-main">
          <div className="header-main-inner">

            <nav className="nav-left">
              <a className="nav-item active">영화</a>
              <a className="nav-item">예매</a>
            </nav>

            <div className="header-logo">MOVIELOG</div>

            <nav className="nav-right">
              <a className="nav-item">이벤트</a>
              <a className="nav-item">혜택</a>
            </nav>

          </div>
        </div>
      </header>
    </div>
  );
}

export default MainHeader
