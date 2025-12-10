import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './Main/Main.jsx'
import Join from './components/Join.jsx'
import Login from './components/Login.jsx'
import Movies from './components/Movies.jsx'
import Benefit from './components/Benefit.jsx'
import Event from './components/Event.jsx'
import Admin from './Admin/Admin.jsx'
import MyPage from './mypage/MyPage.jsx'
import Reservation from './components/Reservation.jsx'
import Seat from './components/Seat.jsx'
import MyInfo from './mypage/MyInfoEdit.jsx'
import MyReserve from './mypage/MyReserve.jsx'
import Payment from './components/Payment.jsx'
import VipLounge from './Main/VipLounge.jsx'
import Service from './Main/Service.jsx'





import './App.css'

function App() {

  return (
    <>
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/benefit' element={<Benefit />} />
        <Route path='/event' element={<Event />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/reservation' element={<Reservation />} />
        <Route path='/seat/:title/:time/:date/:screen' element={<Seat />} />
        <Route path='/myinfo' element={<MyInfo />}/>
        <Route path='/myreserve' element={<MyReserve />}/>
        <Route path='/viplounge' element={<VipLounge />}/>
        <Route path='/service' element={<Service />}/>
        <Route path='/payment/:title/:time/:date/:screen/:seats' element={<Payment />}/>


      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
