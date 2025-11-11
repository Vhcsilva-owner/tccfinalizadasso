const Header = ({ onUserAreaClick }) => { 
  const goToFront2 = () => {
    window.location.href = "http://localhost:5174";
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <a href="#inicio" className="logo">
          Estação Aconchego
          <span className="tagline">Seu refúgio acolhedor</span>
        </a>
        
        <ul className="nav-links">
          <li><a href="#inicio" className="active">Início</a></li>
          <li><a href="#sobre">Sobre Nós</a></li>
          <li><a href="#servicos">Nossos Serviços</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
        
        <div className="header-buttons">
          <button className="to-front2-btn" onClick={goToFront2}>
            Ir para o Front 2
          </button>

          <button className="user-area-btn" onClick={onUserAreaClick}>
            Área do Usuário
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
