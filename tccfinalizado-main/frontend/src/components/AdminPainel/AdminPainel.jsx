import { useState, useEffect } from 'react'
import { cadastroService } from '../Services/api'

const AdminPainel = ({ onLogout }) => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [newUser, setNewUser] = useState({ 
    nome: '', 
    email: '', 
    telefone: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const usuarios = await cadastroService.listar()
      setUsers(usuarios)
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user =>
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.telefone?.includes(searchTerm)
  )

  const getUserType = (email) => {
    return email === 'admin@estacaoaconchego.org' ? 'Administrador' : 'Usuário'
  }

  const handleAddUser = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const usuarioData = {
        nome: newUser.nome,
        email: newUser.email,
        telefone: newUser.telefone,
        senha: '123456',
        confirmarsenha: '123456'
      }

      await cadastroService.cadastrar(usuarioData)
      await loadUsers()
      setNewUser({ nome: '', email: '', telefone: '' })
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setLoading(true)
      
      try {
        await cadastroService.deletar(id)
        await loadUsers()
      } catch (error) {
        console.error('Erro ao excluir usuário:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <div>
          <h1>Painel Administrativo</h1>
          <p>Estacao Aconchego - Gerenciamento de Usuários</p>
          {loading && <span className="loading-text">Carregando...</span>}
        </div>
        <button className="logout-btn" onClick={onLogout} disabled={loading}>
          Sair
        </button>
      </div>

      <div className="admin-content">
        <div className="admin-stats">
          <div className="stat-card">
            <h3>{users.length}</h3>
            <p>Total de Usuários</p>
          </div>
          <div className="stat-card">
            <h3>{users.filter(u => u.email === 'admin@estacaoaconchego.org').length}</h3>
            <p>Administradores</p>
          </div>
          <div className="stat-card">
            <h3>{users.filter(u => u.email !== 'admin@estacaoaconchego.org').length}</h3>
            <p>Usuários Comuns</p>
          </div>
        </div>

        <div className="admin-section">
          <h2>Adicionar Novo Usuário</h2>
          <form onSubmit={handleAddUser} className="user-form">
            <div className="form-row">
              <input 
                type="text" 
                placeholder="Nome completo" 
                value={newUser.nome}
                onChange={(e) => setNewUser({...newUser, nome: e.target.value})} 
                required 
                disabled={loading}
              />
              <input 
                type="email" 
                placeholder="Email" 
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})} 
                required 
                disabled={loading}
              />
              <input 
                type="tel" 
                placeholder="Telefone" 
                value={newUser.telefone}
                onChange={(e) => setNewUser({...newUser, telefone: e.target.value})} 
                disabled={loading}
              />
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Adicionando...' : 'Adicionar'}
              </button>
            </div>
          </form>
        </div>

        <div className="admin-section">
          <div className="search-header">
            <h2>Gerenciar Usuários</h2>
            <input 
              type="text" 
              placeholder="Buscar por email ou telefone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="search-input" 
              disabled={loading}
            />
          </div>

          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Tipo</th>
                  <th>Telefone</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id_cadastro}>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge badge-${user.email === 'admin@estacaoaconchego.org' ? 'admin' : 'user'}`}>
                        {getUserType(user.email)}
                      </span>
                    </td>
                    <td>{user.telefone || 'Não informado'}</td>
                    <td className="actions">
                      <button 
                        className="btn-delete" 
                        onClick={() => handleDeleteUser(user.id_cadastro)}
                        disabled={loading || user.email === 'admin@estacaoaconchego.org'}
                        title={user.email === 'admin@estacaoaconchego.org' ? 'Não é possível excluir o administrador principal' : ''}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && !loading && (
              <div className="no-users">
                <p>Nenhum usuário encontrado</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPainel