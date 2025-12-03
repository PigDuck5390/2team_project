import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MainHeader from './MainHeader.jsx'
import firstMovie from '../img/주토피아.jpg'
import secondMovie from '../img/주술회전.jpg'
import thirdMovie from '../img/윗집사람들.jpg'
import fourthMovie from '../img/정보원.jpg'
import '../css/Main.css'

function Main(){
  const navigate = useNavigate();

  return (
    <>
      <MainHeader />

      <main className="main-area">
        <div className="book-wrapper">
          <div className="open-book">
            <div className="book-spine" />

            <div className="page page-left">
              <div className="movie-row">
                <img src={firstMovie} alt="1번 영화 포스터" />
                <div className="desc">
                  <h1>주토피아 2</h1>
                  <span>더 화려해진 세계, 더 넓어진 주토피아!
                      디즈니의 가~~장 사랑스러운 콤비 '주디'와 '닉'이 돌아온다!

                      미스터리한 뱀 ‘게리’가 나타난 순간,
                      주토피아가 다시 흔들리기 시작했다!

                      혼란에 빠진 도시를 구하기 위해
                      환상의 콤비 ‘주디’ & ‘닉’이 잠입 수사에 나서고
                      상상 그 이상의 진실과 위협을 마주하게 되는데...!

                      11월, 초특급 추적 어드벤처가 펼쳐진다!
                      </span>
                </div>
                <button className="quick-reserv" onClick={() => navigate('/booking/1')}>바로 예매하기</button>
              </div>

              <div className="movie-row">
                <img src={secondMovie} alt="2번 영화 포스터" />
                <div className="desc">
                  <h1>영화제목</h1>
                  <span>2번 영화 설명 텍스트</span>
                </div>
                <button className="quick-reserv">바로 예매하기</button>
              </div>
            </div>

            <div className="page page-right">
              <div className="movie-row">
                <img src={thirdMovie} alt="3번 영화 포스터" />
                <div className="desc">
                  <h1>영화제목</h1>
                  <span>3번 영화 설명 텍스트</span>
                </div>
                <button className="quick-reserv">바로 예매하기</button>
              </div>

              <div className="movie-row">
                <img src={fourthMovie} alt="4번 영화 포스터" />
                <div className="desc">
                  <h1>영화제목</h1>
                  <span>4번 영화 설명 텍스트</span>
                </div>
                <button className="quick-reserv">바로 예매하기</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}



export default Main