import React from 'react';
import 'tw-elements';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import About from './assets/components/About';

function App() {

  return (
    <div className="primary-font max-w-[1750px] bg-black w-full mx-auto overflow-hidden">
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
          <Route path="/about" element={ <About /> } />
      </Routes>
      <Footer />
      </Router>
    </div>
  )
}

export default App
