import React from 'react'

const Hero = () => {
  return (
    <section className="hero" id="inicio">
      <div className="hero-content">
        <h1>Bem-vindo à Estação Aconchego</h1>
        <p>Seu refúgio perfeito para sua nova historia na cidade. Conforto, coração e momentos inesquecíveis te aguardam.</p>
        <div className="hero-buttons">
          <a href="#contato" className="btn">Fale Conosco</a>
          <a href="#sobre" className="btn secondary">Conhecer Mais</a>
        </div>
      </div>
    </section>
  )
}

export default Hero