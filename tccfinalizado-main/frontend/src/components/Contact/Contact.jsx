import { useState } from 'react'
import { cadastrarContato } from '../Services/api'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '', visible: false })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const showMessage = (type, text) => {
    setMessage({ text, type, visible: true })
    setTimeout(() => {
      setMessage({ text: '', type: '', visible: false })
    }, 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!formData.name || !formData.email || !formData.message) {
        showMessage('error', 'Por favor, preencha todos os campos obrigatórios.')
        setLoading(false)
        return
      }

      console.log('Enviando dados de contato:', formData)

      const dadosContato = {
        nome: formData.name,           
        email: formData.email,
        telefone: formData.phone,      
        assunto: formData.subject,     
        mensagem: formData.message     
      }

      console.log('Dados enviados para API:', dadosContato)

      await cadastrarContato(dadosContato)
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      
      showMessage('success', 'Mensagem enviada com sucesso! Entraremos em contato em breve.')
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      showMessage('error', 'Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="contact" id="contato">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Entre em Contato</h2>
          <p>Estamos prontos para atender você. Entre em contato para saber mais sobre nossos serviços, fazer doações ou se tornar um voluntário.</p>
          
          <div className="info-item">
            <h3>Endereço</h3>
            <p>Rua das Esperanças, 777 - Prox. Metro Recomeço<br />São Paulo - SP, 06565-678</p>
          </div>
          
          <div className="info-item">
            <h3>Telefone</h3>
            <p>(11) 94002-8922</p>
          </div>
          
          <div className="info-item">
            <h3>Email</h3>
            <p>contato.estacaoaconchego@gmail.com</p>
          </div>
          
          <div className="info-item">
            <h3>Horário de Atendimento</h3>
            <p>Segunda a Sexta: 8h às 18h<br />Sábado: 8h às 12h</p>
          </div>
        </div>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          {message.visible && (
            <div className={`form-message form-message-${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Telefone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(11) 98765-4321"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">Assunto</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Como podemos ajudar?</option>
              <option value="voluntario">Quero ser voluntário</option>
              <option value="doacao">Quero fazer doação</option>
              <option value="servicos">Informações sobre serviços</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Mensagem</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Escreva sua mensagem aqui..."
              required
              disabled={loading}
            />
          </div>
          
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar Mensagem'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact