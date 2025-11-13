import React from 'react'

const Header = () => {
  const handleBackClick = () => {
    window.location.href = 'http://localhost:5173'
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    const section = document.querySelector('#inicio')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="header">
      <nav className="nav-container">
        <a href="#inicio" className="logo" onClick={handleLogoClick}>
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
