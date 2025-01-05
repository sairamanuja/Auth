import React from 'react'
import './index.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//components
import Signup from './components/Signup'
import Login from './components/Login'
import Verification from './components/Verification'
import Forgetpass from './components/Forgetpass'
import Resetpass from './components/Resetpass';

function App() {
 
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verification />} />
      <Route path="/forgetpass" element={<Forgetpass />} />
      <Route path="/reset/:token" element={<Resetpass />} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
