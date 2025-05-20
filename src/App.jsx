import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './assets/components/landing/Header'
import Hero from './assets/components/landing/Hero'
import Cards from './assets/components/landing/Cards'
import Dogs from './assets/components/landing/Dogs'
import About from './assets/components/landing/About'

function App() {

  return (
    <div className="primary-font w-full mx-auto overflow-hidden">
      <Header />
      <Hero />
      <Cards />
      <Dogs />
      <About />
    </div>
  )
}

export default App
