const API_BASE_URL = "http://localhost:5010";

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro na API (${response.status}): ${errorText}`);
  }

  try {
    return await response.json();
  } catch {
    return {};
  }
}

export async function listarContatos() {
  return await apiRequest("/contato");
}

export async function buscarContato(id) {
  return await apiRequest(`/contato/${id}`);
}

export async function cadastrarContato(dados) {
  return await apiRequest("/contato", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

export async function atualizarContato(id, dados) {
  return await apiRequest(`/contato/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });
}

export async function deletarContato(id) {
  return await apiRequest(`/contato/${id}`, {
    method: "DELETE",
  });
}

export async function listarCadastros() {
  return await apiRequest("/cadastro");
}

export async function buscarCadastro(id) {
  return await apiRequest(`/cadastro/${id}`);
}

export async function cadastrarUsuario(dados) {
  return await apiRequest("/cadastro", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

export async function atualizarCadastro(id, dados) {
  return await apiRequest(`/cadastro/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });
}

export async function deletarCadastro(id) {
  return await apiRequest(`/cadastro/${id}`, {
    method: "DELETE",
  });
}

export async function listarAutenticacoes() {
  return await apiRequest("/autenticacao");
}

//ADMIN PANEL

export const authService = {
  async login(email, senha) {
    try {
      const usuarios = await listarCadastros();
      
      const usuario = usuarios.find(user => 
        user.email === email && user.senha === senha
      );
      
      if (usuario) {
        localStorage.setItem('user', JSON.stringify(usuario));
        localStorage.setItem('isAuthenticated', 'true');
        return usuario;
      }
      
      throw new Error('Credenciais inválidas');
    } catch (error) {
      throw error;
    }
  },

  async adminLogin(email, senha) {
    try {
      const usuarios = await listarCadastros();
      
      const adminEmails = [
        'admin@estacaoaconchego.org',
      ];
      
      console.log('Procurando admin com email:', email);
      console.log('Usuários no banco:', usuarios);
      
      const adminUser = usuarios.find(user => {
        const isAdminEmail = adminEmails.includes(user.email);
        const isPasswordCorrect = user.senha === senha;
        console.log('Verificando usuário:', user.email, 'Admin?', isAdminEmail, 'Senha correta?', isPasswordCorrect);
        return isAdminEmail && isPasswordCorrect;
      });
      
      if (adminUser) {
        console.log('Admin encontrado:', adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isAdmin', 'true');
        return adminUser;
      }
      
      console.log('Nenhum admin encontrado com essas credenciais');
      throw new Error('Credenciais de admin inválidas');
    } catch (error) {
      console.error('Erro no adminLogin:', error);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
  },

  isAdmin() {
    return localStorage.getItem('isAdmin') === 'true';
  }
};

export const cadastroService = {
  async listar() {
    return await listarCadastros();
  },

  async buscarPorId(id) {
    return await buscarCadastro(id);
  },

  async cadastrar(usuario) {
    return await cadastrarUsuario(usuario);
  },

  async atualizar(id, usuario) {
    return await atualizarCadastro(id, usuario);
  },

  async deletar(id) {
    return await deletarCadastro(id);
  }
};