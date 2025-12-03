import { useNavigate, Link } from 'react-router-dom'
import '../css/MainHeader.css'
import {useState, useEffect} from 'react'

function MainHeader(){

    const navigate = useNavigate()
    const [loggedInId, setLoggedInId] = useState(null);

    useEffect(()=> {
      const id = localStorage.getItem('loggedInId');
      if (id) {
        setLoggedInId(id);
      }
    }, [])
      const handleLogout = () => {
        localStorage.removeItem('loggedInId');
        setLoggedInId(null);
        window.location.reload();
      }

      const headerRightContent = loggedInId ? (
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          환영합니다. {loggedInId}님
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
        <Link to = "/login"><button>로그인</button></Link>
        <Link to = "/join"><button>회원가입</button></Link>
        </>
      )

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
            {headerRightContent}
            {/* <button>로그인</button> */}
            {/* <button>회원가입</button> */}
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