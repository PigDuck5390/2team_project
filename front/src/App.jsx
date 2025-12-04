import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './Main/Main.jsx'
import Join from './components/Join.jsx'
import Login from './components/Login.jsx'
import Movies from './components/Movies.jsx'
import Benefit from './components/Benefit.jsx'
import Event from './components/Event.jsx'
import Booking from './components/Booking.jsx'
import Admin from './Admin/Admin.jsx'
import MyPage from './components/MyPage.jsx'
import Reservation from './components/Reservation.jsx'
import Seat from './components/Seat.jsx'




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
        <Route path='/booking/:movieId' element={<Booking />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/reservation' element={<Reservation />} />
        <Route path='/seat/:title/:time' element={<Seat />} />
        


      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
