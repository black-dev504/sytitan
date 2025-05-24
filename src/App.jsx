import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './assets/components/landing/Header'
import Home from './assets/components/landing/landing/Home'
import Login from './assets/components/Login';
import Add from './assets/components/Add';
import Contact from '../../intern/src/assets/components/Contact'
import { AuthProvider } from './assets/Authprovider';
import ProtectedRoute from './assets/Protectedroute';
import Lobby from '../../intern/src/assets/components/Lobby';


function App() {

  return (
    <div className="primary-font w-full mx-auto overflow-hidden">
        <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
       
          <Route path="/admin/dashboard/login" element={ <AuthProvider> <Login />  </AuthProvider>} />
          <Route path='/admin/dashboard' element={ <AuthProvider><ProtectedRoute> <Add /> </ProtectedRoute>  </AuthProvider>}/>
        <Route path="/lobby" element={<Lobby />} />

      </Routes>
      </Router>
    </div>
  )
}

export default App
