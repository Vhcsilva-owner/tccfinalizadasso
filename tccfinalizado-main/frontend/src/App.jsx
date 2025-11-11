import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Stats from './components/stats/Stats'
import About from './components/About/About'
import Services from './components/Services/Services'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import UserArea from './components/UserArea/UserArea'
import AdminPainel from './components/AdminPainel/AdminPainel'
import { listarCadastros, cadastrarUsuario, authService } from "./components/Services/api.js"

function App() {
  const [showUserArea, setShowUserArea] = useState(false)
  const [usuarios, setUsuarios] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [message, setMessage] = useState({ text: '', type: '', visible: false })

  useEffect(() => {
    listarCadastros()
      .then(setUsuarios)
      .catch((err) => console.error("Erro ao listar cadastros:", err))
    
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated()
      const admin = authService.isAdmin()
      const user = authService.getCurrentUser()
      
      setIsAuthenticated(authenticated)
      setIsAdmin(admin)
      setCurrentUser(user)
    }
    
    checkAuth()
  }, [])

  const showMessage = (type, text) => {
    setMessage({ text, type, visible: true })
    setTimeout(() => {
      setMessage({ text: '', type: '', visible: false })
    }, 5000)
  }

  const handleCadastro = async (dados) => {
    try {
      await cadastrarUsuario(dados)
      const atualizados = await listarCadastros()
      setUsuarios(atualizados)
      showMessage('success', 'Usuário cadastrado com sucesso!')
    } catch (error) {
      console.error("Erro ao cadastrar:", error)
      showMessage('error', 'Erro ao cadastrar usuário!')
    }
  }

  const handleAdminLogin = () => {
    setIsAdmin(true)
    setIsAuthenticated(true)
  }

  const handleUserLogin = (user) => {
    setIsAuthenticated(true)
    setCurrentUser(user)
  }

  const handleLogout = () => {
    authService.logout()
    setIsAdmin(false)
    setIsAuthenticated(false)
    setCurrentUser(null)
    showMessage('info', 'Logout realizado com sucesso!')
  }

  if (isAdmin) {
    return <AdminPainel onLogout={handleLogout} />
  }

  return (
    <div className="App">
      {message.visible && (
        <div className={`site-message site-message-${message.type}`}>
          <div className="message-content">
            <span className="message-text">{message.text}</span>
            <button 
              className="message-close"
              onClick={() => setMessage({ text: '', type: '', visible: false })}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <Header 
        onUserAreaClick={() => setShowUserArea(true)} 
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Contact />
      <Footer />
      
      {showUserArea && (
        <UserArea
          onClose={() => setShowUserArea(false)}
          onCadastrar={handleCadastro}
          onAdminLogin={handleAdminLogin}
          onUserLogin={handleUserLogin}
          onShowMessage={showMessage}
        />
      )}
    </div>
  )
}

export default App