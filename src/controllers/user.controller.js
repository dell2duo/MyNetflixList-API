const connection = require("../database/connection");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

async function create(req, res) {
  const data = req.body;

  const conta = {
    id: uuidv4(),
    nome: data.nome,
    email: data.email,
    senha: bcrypt.hashSync(data.senha, 10),
    data_nascimento: data.data_nascimento,
  };

  return await connection("contas")
    .insert(conta)
    .then(() => {
      /** código 200 Sucess
       * Tudo ocorreu bem, sucesso.
       */
      res.status(200).json({ msg: "Conta criada com sucesso!" });
    })
    .catch((err) => {
      /** código 406 Not Acceptable
       *  Não encontra nenhum conteúdo seguindo os critérios
       *  fornecidos pelo agente do usuário.
       * */
      res.status(400).json(err);
    });
}

async function listUsers(req, res) {
  return await connection("contas")
    .select("id", "nome", "email")
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.send(err);
    });
}

async function createProfile(req, res) {
  const data = req.body;

  const perfil = {
    id: uuidv4(),
    nome: data.nome,
    data_nascimento: data.data_nascimento,
    id_conta: data.id_conta,
  };

  return await connection("perfis")
    .insert(perfil)
    .then(() => {
      res.status(200).json({ msg: "Perfil criado com sucesso!" });
    })
    .catch((err) => {
      res.status(406).json(err);
    });
}

async function listProfiles(req, res) {
  return await connection("perfis")
    .select("*")
    .where("id_conta", req.body.id_conta)
    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
}

module.exports = {
  create,
  listUsers,
  createProfile,
  listProfiles,
};
