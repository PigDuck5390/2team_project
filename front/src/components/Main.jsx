import { useState } from 'react'

import MainHeader from './MainHeader.jsx'
import firstMovie from '../img/주토피아.jpg'
import secondMovie from '../img/주술회전.jpg'
import thirdMovie from '../img/윗집사람들.jpg'
import fourthMovie from '../img/정보원.jpg'
import '../css/Main.css'

function Main(){

  
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
                  <h2>영화제목</h2>
                  <p>1번 영화 설명 텍스트</p>
                </div>
              </div>

              <div className="movie-row">
                <img src={secondMovie} alt="2번 영화 포스터" />
                <div className="desc">
                  <h2>영화제목</h2>
                  <p>2번 영화 설명 텍스트</p>
                </div>
              </div>
            </div>

            <div className="page page-right">
              <div className="movie-row">
                <img src={thirdMovie} alt="3번 영화 포스터" />
                <div className="desc">
                  <h2>영화제목</h2>
                  <p>3번 영화 설명 텍스트</p>
                </div>
              </div>

              <div className="movie-row">
                <img src={fourthMovie} alt="4번 영화 포스터" />
                <div className="desc">
                  <h2>영화제목</h2>
                  <p>4번 영화 설명 텍스트</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}



export default Main