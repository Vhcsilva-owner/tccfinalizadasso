import { connection } from '../conection.js';


export async function listar() {
  const comando = `
    SELECT id_contato, nome, email, assunto, mensagem
    FROM contato2
    ORDER BY id_contato DESC
  `;

  const [linhas] = await connection.query(comando);
  return linhas;
}


export async function buscarPorId(id) {
  const comando = `
    SELECT id_contato, nome, email, assunto, mensagem
    FROM contato2
    WHERE id_contato = ?
  `;

  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}


export async function cadastrar(contato) {
  const comando = `
    INSERT INTO contato2 (
      nome, email, assunto, mensagem
    )
    VALUES (?, ?, ?, ?)
  `;

  const [resposta] = await connection.query(comando, [
    contato.nome,
    contato.email,
    contato.assunto,
    contato.mensagem
  ]);

  return resposta.insertId; 
}


export async function atualizar(id, contato) {
  const comando = `
    UPDATE contato2
    SET nome = ?, email = ?, assunto = ?, mensagem = ?
    WHERE id_contato = ?
  `;

  await connection.query(comando, [
    contato.nome,
    contato.email,
    contato.assunto,
    contato.mensagem,
    id
  ]);
}


export async function deletar(id) {
  const comando = `
    DELETE FROM contato2
    WHERE id_contato = ?
  `;

  await connection.query(comando, [id]);
}
