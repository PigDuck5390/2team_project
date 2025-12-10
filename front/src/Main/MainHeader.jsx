import { useNavigate, Link, useLocation } from 'react-router-dom'
import '../css/MainHeader.css'
import { useState, useEffect } from 'react'

function MainHeader() {

  const navigate = useNavigate()
  const [loggedInId, setLoggedInId] = useState(null);
  const { state: userInfo } = useLocation()
  const [point, setPoint] = useState(0);


  useEffect(() => {
    if (userInfo?.name) {
      setLoggedInId(userInfo.name)
    }
  }, [userInfo])

  useEffect(() => {
    if (!userInfo?.id) return;
    fetch(`http://192.168.0.227:3000/point/${userInfo.id}`)
      .then(res => res.json())
      .then(data => {
        setPoint(data);
      });
  }, [userInfo?.id]);


  function handleLogout() {
    setLoggedInId(null);
    alert("로그아웃 되었습니다")
    navigate('/', {
      state: {
        name: null,
        id: null
      }
    })

  }

  function mypage() {
    navigate('/mypage', {
      state: {
        name: userInfo?.name,
        id: userInfo?.id
      }
    })
  }

  function moveMain() {
    navigate("/", {
      state: {
        name: userInfo?.name,
        id: userInfo?.id
      }
    })
  }
  function moveMovies() {
    navigate("/movies", {
      state: {
        name: userInfo?.name,
        id: userInfo?.id
      }
    })
  }
  function moveReserv() {
    navigate("/reservation", {
      state: {
        name: userInfo?.name,
        id: userInfo?.id
      }
    })
  }
  function moveBenefit() {
    navigate("/benefit", {
      state: {
        name: userInfo?.name,
        id: userInfo?.id
      }
    })
  }
  function moveEvent() {
    navigate("/event", {
      state: {
        name: userInfo?.name,
        id: userInfo?.id
      }
    })
  }
  function moveVip() {
    if (point >= 500) {
      navigate("/viplounge", {
        state: {
          name: userInfo?.name,
          id: userInfo?.id,
          point: point
        }
      });
    } else {
      alert("영화 더 보고 오세요!");
    }
  }
  function moveService() {
    navigate("/service", {
      state: {
        name: userInfo?.name,
        id: userInfo?.id
      }
    })
  }


  const headerRightContent = loggedInId ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      환영합니다. {loggedInId}님
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={mypage}>마이페이지</button>
    </div>
  ) : (
    <>
      <Link to="/login"><button>로그인</button></Link>
      <Link to="/join"><button>회원가입</button></Link>
    </>
  )

  return (
    <header className="main-header">
      {/* 로그인/회원가입 라인 */}
      <div className="header-top">
        <div className="header-top-inner">
          <div className="header-top-left">
            <span onClick={moveVip}>VIP LOUNGE</span>
            <span>멤버십</span>
            <span onClick={moveService}>고객센터</span>
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