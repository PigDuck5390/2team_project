import { useNavigate, Link, useLocation } from 'react-router-dom'
import '../css/MainHeader.css'
import {useState, useEffect} from 'react'

function MainHeader(){

    const navigate = useNavigate()
    const [loggedInId, setLoggedInId] = useState(null);
    const location = useLocation()
    const { state : locateName } = location
    
    useEffect(()=> {
      if (locateName) {
        setLoggedInId(locateName)
      }
    }, [locateName])

      function handleLogout(){
        setLoggedInId(null);
        alert("로그아웃 되었습니다")
        navigate('/', { state : null })
        
      }

      function mypage(){
        navigate('/mypage', { state : locateName })
      }
      
      function moveMain(){
        navigate("/", { state : locateName })
      }
      function moveMovies(){
        navigate("/movies", { state : locateName })
      }
      function moveReserv(){
        navigate("/reservation", { state : locateName })
      }
      function moveBenefit(){
        navigate("/benefit", { state : locateName })
      }
      function moveEvent(){
        navigate("/event", { state : locateName })
      }


      const headerRightContent = loggedInId ? (
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          환영합니다. {loggedInId}님
          <button onClick={handleLogout}>로그아웃</button>
          <button onClick={mypage}>마이페이지</button>
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
            <a onClick={moveMovies} className="nav-item active">영화</a>
            <a onClick={moveReserv} className="nav-item">예매</a>
          </nav>

          <div className="header-logo" onClick={moveMain}>
            MOVIELOG
          </div>

          <nav className="nav-right">
            <a onClick={moveEvent} className="nav-item">이벤트</a>
            <a onClick={moveBenefit} className="nav-item">혜택</a>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default MainHeader