import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './components/Main.jsx'
import Join from './components/Join.jsx'
import Login from './components/Login.jsx'
import Movies from './components/Movies.jsx'
import Benefit from './components/Benefit.jsx'
import Event from './components/Event.jsx'


import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Join />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/benefit' element={<Benefit />} />
        <Route path='/event' element={<Event />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
