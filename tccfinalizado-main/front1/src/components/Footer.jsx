import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Estação Aconchego</h3>
            <p>Seu refúgio acolhedor no coração da cidade, oferecendo conforto e ajuda desde 2025.</p>
          </div>
          
          <div className="footer-section">
            <h4>Contato Rápido</h4>
            <ul>
              <li><a href="tel:+551199999999">(11) 94002-8922</a></li>
              <li><a href="mailto:contato@estacaoaconchego.com.br">contato.estacaoaconchego@gmail.com</a></li>
              <li>Rua das Esperanças, 777 - Prox. ao metro Recomeço</li>
            </ul>
          </div>
          
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Estação Aconchego. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer