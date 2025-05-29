import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './assets/components/Header'
import Home from './assets/components/landing/Home'
import Login from './assets/components/Login';
import Add from './assets/components/Add';
import Contact from './assets/components/Contact'
import { AuthProvider } from './assets/Authprovider';
import ProtectedRoute from './assets/Protectedroute';
import Lobby from './assets/components/Lobby';
import ScrollToTop from './assets/components/scrollToTop';
import Profile from './assets/components/Profile';
import Footer from './assets/components/Footer';


function App() {

  return (
    <div className="primary-font w-full mx-auto overflow-hidden">
        <Router>
        <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
       
          <Route path="/admin/dashboard/login" element={  <Login />  } />
          <Route path='/admin/dashboard' element={ <ProtectedRoute> <Add /> </ProtectedRoute>  }/>
          <Route path="/lobby" element={ <Lobby />  } />
          <Route path="/profile" element={ <Profile /> } />


      </Routes>
      <Footer />
      </Router>
    </div>
  )
}

export default App
