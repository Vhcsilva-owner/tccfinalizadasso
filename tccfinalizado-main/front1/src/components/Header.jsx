import React from 'react'

const Header = () => {
  const handleBackClick = () => {
    window.location.href = 'http://localhost:5173'
  }

  return (
    <header className="header">
      <nav className="nav-container">
        <a href="#inicio" className="logo">
          Estação Aconchego
          <span>Seu refúgio acolhedor</span>
        </a>

        <div className="nav-buttons">
          <button className="back-btn" onClick={handleBackClick}>
            Voltar ao site principal
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
