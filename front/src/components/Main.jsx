import MainHeader from './MainHeader.jsx'
import firstMovie from '../img/주토피아.webp'
import secondMovie from '../img/주술회전.webp'
import thirdMovie from '../img/윗집사람들.jfif'
// import thirdMovie from '../img/정보원.webp'
import './Main.css'

function Main(){
    return(
        <>
       <h1>메인화면</h1>
       <MainHeader />
       <br />
       <br />
       <img className="first-movie" src={firstMovie} />
       <img className="second-movie" src={secondMovie} />
        </>
    )
}

export default Main