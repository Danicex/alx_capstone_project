import { useState } from 'react'
import './App.css'
import { AuthProvider } from './Authentication/AuthContext'
import LandingPage from './LandingPage'
import { Route, Routes } from 'react-router-dom'
import Login from './Authentication/Login'
import SignUp from './Authentication/SignUp'
import Logout from './Authentication/Logout'
function App() {
 

  return (
    <AuthProvider>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/' element={<LandingPage />}/>
      
    </Routes>
    </AuthProvider>
  )
}

export default App
