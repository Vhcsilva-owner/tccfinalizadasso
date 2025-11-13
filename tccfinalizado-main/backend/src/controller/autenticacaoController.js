import * as repo from '../repository/autenticacaoRepository.js';

export async function listar(req, resp) {
  let registros = await repo.listar();
  resp.send(registros);
}

export async function buscarPorId(req, resp) {
  let id = Number(req.params.id_autenticacao);
  let registro = await repo.buscarPorId(id);
  resp.send(registro);
}

export async function cadastrar(req, resp) {
  let novo = req.body;
  let id = await repo.cadastrar(novo);
  resp.send({ novoId: id });
}

export async function atualizar(req, resp) {
  let id = Number(req.params.id_autenticacao);
  let dados = req.body;

  await repo.atualizar(id, dados);
  resp.send();
}

export async function deletar(req, resp) {
  let id = Number(req.params.id_autenticacao);

  await repo.deletar(id);
  resp.send();
}

export async function autenticar(req, resp) {
  try {
    const { email, senha } = req.body;
    console.log("email:", email, "senha:", senha);
    const usuario = await repo.autenticar(email, senha);
    console.log("🔹 Resultado do banco:", usuario);

    if (!usuario) {
      return resp.status(401).send({ erro: "Email ou senha incorretos." });
    }

    resp.send(usuario);
  } catch (error) {
    console.error(error);
    resp.status(500).send({ erro: "Erro ao autenticar usuário." });
  }
}

