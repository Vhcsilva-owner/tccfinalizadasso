import React from 'react'

const Hero = () => {

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="inicio">
      <div className="hero-content">
        <h1>Bem-vindo à Estação Aconchego</h1>
        <p>Seu refúgio perfeito para sua nova história na vida. Conforto, coração e recomços inesqueciveis de aguardam.</p>

        <div className="hero-buttons">
          <button 
            className="btn"
            onClick={() => scrollToSection('#contato')}
          >
            Fale Conosco
          </button>

          <button 
            className="btn secondary"
            onClick={() => scrollToSection('#sobre')}
          >
            Conhecer Mais
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
