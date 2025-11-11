import { connection } from '../conection.js';

export async function listar() {
  const comando = 'SELECT * FROM cadastro';
  const [linhas] = await connection.query(comando);
  return linhas;
}

export async function buscarPorId(id) {
  const comando = 'SELECT * FROM cadastro WHERE id_login = ?';
  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}

export async function cadastrar(autenticacao) {
  const comando = `
    INSERT INTO cadastro (
      email, senha
    ) VALUES (?, ?)`;

  const [resposta] = await connection.query(comando, [
    autenticacao.email,
    autenticacao.senha,
  ]);

  return resposta.insertId;
}

export async function atualizar(id, autenticacao) {
  const comando = `
    UPDATE cadastro SET
      email = ?, senha = ?
    WHERE id_login = ?`;

  await connection.query(comando, [
    autenticacao.email,
    autenticacao.senha,
    id
  ]);
}

export async function deletar(id) {
  const comando = 'DELETE FROM cadastro WHERE id_login = ?';
  await connection.query(comando, [id]);
}

export async function autenticar(email, senha) {
  const comando = 'SELECT * FROM cadastro WHERE email = ? AND senha = ?';
  console.log("🔹 Comando SQL:", comando);
  const [linhas] = await connection.query(comando, [email, senha]);
  console.log("🔹 Linhas retornadas linha 50:", linhas[0]);
  return linhas[0]; 
}