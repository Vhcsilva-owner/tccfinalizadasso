import React, { useState } from 'react'
import { enviarMensagem } from './Services/api.js'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await enviarMensagem({
        nome: formData.name,
        email: formData.email,
        telefone: '',
        assunto: formData.subject,
        mensagem: formData.message
      })

      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Erro ao enviar a mensagem:', error)
      alert('Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.')
    }
  }

  return (
    <section className="contact" id="contato">
      <div className="container">
        <h2>Entre em Contato</h2>
        <p style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.2rem' }}>
          Tem alguma dúvida e gostaria de respostas? Estamos aqui para ajudar!
        </p>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Informações de Contato</h3>

            <div className="contact-details">
              <div className="contact-item">
                <h4>Endereço</h4>
                <p>Rua das Esperanças, 777<br />Centro - São Paulo<br />CEP: 06565-678</p>
              </div>

              <div className="contact-item">
                <h4>Telefone</h4>
                <p>(11) 94002-8922</p>
              </div>

              <div className="contact-item">
                <h4>E-mail</h4>
                <p>contato.estacaoaconchego@gmail.com</p>
              </div>

              <div className="contact-item">
                <h4>Atendimento</h4>
                <p>Das 8:00 as 18:00 de Segunda a Sexta</p>
                <p>Das 8:00 as 14:00 aos Sabádos</p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h3>Envie uma Mensagem</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Assunto</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Ex: Reserva para final de semana"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Conte-nos mais sobre sua consulta..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
