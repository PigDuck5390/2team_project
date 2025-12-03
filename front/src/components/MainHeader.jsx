import { useNavigate } from 'react-router-dom'
import '../css/MainHeader.css'


function MainHeader(){

    const navigate = useNavigate()

return (
    <header className="main-header">
      {/* 로그인/회원가입 라인 */}
      <div className="header-top">
        <div className="header-top-inner">
          <div className="header-top-left">
            <span>VIP LOUNGE</span>
            <span>멤버십</span>
            <span>고객센터</span>
          </div>
          <div className="header-top-right">
            <button>로그인</button>
            <button>회원가입</button>
          </div>
        </div>
      </div>

      {/* 중앙 로고 기준 좌/우 메뉴 */}
      <div className="header-main">
        <div className="header-main-inner">
          <nav className="nav-left">
            <a href="#" className="nav-item active">영화</a>
            <a href="#" className="nav-item">예매</a>
          </nav>

          <div className="header-logo">
            MOVIELOG
          </div>

          <nav className="nav-right">
            <a href="#" className="nav-item">이벤트</a>
            <a href="#" className="nav-item">혜택</a>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default MainHeader