import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.scss'

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Contact />
      <Footer />
    </div>
  )
  
}

export default App