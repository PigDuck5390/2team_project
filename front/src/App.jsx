import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './Main/Main.jsx'
import Join from './components/Join.jsx'
import Login from './components/Login.jsx'
import Movies from './components/Movies.jsx'
import Benefit from './components/Benefit.jsx'
import Event from './components/Event.jsx'
import MyPage from './mypage/MyPage.jsx'
import Reservation from './components/Reservation.jsx'
import Seat from './components/Seat.jsx'
import MyInfo from './mypage/MyInfoEdit.jsx'
import MyReserve from './mypage/MyReserve.jsx'
import Payment from './components/Payment.jsx'
import VipLounge from './Main/VipLounge.jsx'
import Service from './Main/Service.jsx'


import Admin from './Admin/Admin.jsx'
import Management from './Admin/Management.jsx'
import ManageBenefit from './Admin/ManageMenu/ManageBenefit.jsx'
import ManageEvent from './Admin/ManageMenu/ManageEvent.jsx'
import ManageMovies from './Admin/ManageMenu/ManageMovies.jsx'
import ManageReserv from './Admin/ManageMenu/ManageReserv.jsx'
import ManageUser from './Admin/ManageMenu/ManageUser.jsx'


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
        <Route path='/seat/:title/:time/:date/:screen/:movieId' element={<Seat />} />
        <Route path='/myinfo' element={<MyInfo />}/>
        <Route path='/myreserve' element={<MyReserve />}/>
        <Route path='/viplounge' element={<VipLounge />}/>
        <Route path='/service' element={<Service />}/>
        <Route path='/payment/:title/:time/:date/:screen/:seats/:movieId' element={<Payment />}/>

        <Route path='/admin/management' element={<Management />}/>
        <Route path='/admin/management/benefit' element={<ManageBenefit />}/>
        <Route path='/admin/management/event' element={<ManageEvent />}/>
        <Route path='/admin/management/movies' element={<ManageMovies />}/>
        <Route path='/admin/management/reserv' element={<ManageReserv />}/>
        <Route path='/admin/management/user' element={<ManageUser />}/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
