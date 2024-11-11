import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/u/home' element={<Home/>}/>
        <Route path='*' element={<h1>ERROR 404 [NOT FOUND]</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
