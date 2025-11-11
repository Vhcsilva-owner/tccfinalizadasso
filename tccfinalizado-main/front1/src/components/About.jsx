import React from 'react'

const About = () => {
  return (
    <section className="about" id="sobre">
      <div className="container">
        <h2>Sobre a Estação Aconchego</h2>
        
        <div className="about-intro">
          <p>Há 1 ano oferecendo hospitalidade e experiências memoráveis para pessoas que precisam de ajuda.</p>
        </div>

        <div className="about-features">
          <div className="feature">
            <h3>Ambiente Acolhedor</h3>
            <p>Criamos um ambiente familiar onde quem esta sendo ajudado se sinta em casa.</p>
          </div>
          <div className="feature">
            <h3>Comunidade Vibrante</h3>
            <p>Conecte-se com pessoas da comunidade em nossos espaços comunitários.</p>
          </div>
          <div className="feature">
            <h3>Café da Manhã Incluído</h3>
            <p>Comece seu dia com nosso delicioso e espetacular café da manhã.</p>
          </div>
          <div className="feature">
            <h3>Segurança 24h</h3>
            <p>Descanse tranquilo com nossa segurança 24 horas.</p>
          </div>
        </div>

        <div className="about-history">
          <h3>Nossa História</h3>
          <p>
            A Estação Aconchego nasceu do sonho de criar um espaço onde pessoas e familias pudessem não apenas Dormir, 
            mas vivenciar experiências autênticas e formar conexões verdadeiras e uma nova oportunidade de Recomeço.
          </p>
          <p>
            Localizada em um ponto estratégico da cidade, oferecemos fácil acesso aos principais pontos de auto ajuda para a vida, sempre mantendo o ambiente tranquilo e acolhedor que nos define.
          </p>
        </div>

        <div className="about-stats">
          <div className="stat">
            <h4>1 ano</h4>
            <p>Anos de Experiência</p>
            <small>Acomodando e Restaurando vidas</small>
          </div>
          <div className="stat">
            <h4>1000+</h4>
            <p>Familias Ajudadas</p>
            <small>Vidas transformadas e restauradas</small>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About