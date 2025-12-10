import { useNavigate, Link, useLocation } from 'react-router-dom'
import {useState, useEffect} from 'react'
import '../css/MainHeader.css'

function MainHeader(){
    const navigate = useNavigate()

    const { state : userInfo } = useLocation()
    const [loggedInName, setLoggedInName] = useState(null);

    //닉네임 세팅
    useEffect(()=> {
      if (userInfo?.name) {
        setLoggedInName(userInfo.name)
      }
    }, [userInfo])

    //로그아웃
    function handleLogout(){
      setLoggedInName(null);
      alert("로그아웃 되었습니다")
      navigate('/', { state : {
        name : null,
        id : null
          } 
        }
      )  
    }
    
    //마이페이지 이동
    function mypage(){
      navigate('/mypage', { state : {
        name : userInfo?.name,
        id : userInfo?.id 
          } 
        }
      )
    }

    //메인화면 이동
    function moveMain(){
      navigate("/", { state : {
        name : userInfo?.name,
        id : userInfo?.id 
          } 
        }
      )
    }

    //메뉴 : 영화 이동
    function moveMovies(){
      navigate("/movies", { state : {
        name : userInfo?.name,
        id : userInfo?.id 
          }
        }
      )
    }

    //메뉴 : 예매 이동
    function moveReserv(){
      navigate("/reservation", { state : {
        name : userInfo?.name,
        id : userInfo?.id 
          } 
        }
      )
    }
    
    //메뉴 : 혜택 이동
    function moveBenefit(){
      navigate("/benefit", { state : {
        name : userInfo?.name,
        id : userInfo?.id 
          } 
        }
      )
    }

    //메뉴 : 이벤트 이동
    function moveEvent(){
      navigate("/event", { state : {
        name : userInfo?.name,
        id : userInfo?.id 
          } 
        }
      )
    }

    //로그인 상태에 따른 프론트
    const headerRightContent = loggedInName ? (
      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        환영합니다. {loggedInName}님
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
              <span>고객센터</span>
            </div>
            <div className="header-top-right">
              {headerRightContent}
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