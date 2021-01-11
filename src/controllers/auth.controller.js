const connection = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const data = req.body;
  return await connection("contas")
    .select("*")
    .where("email", data.email)
    .first()
    .then((conta) => {
      const match = bcrypt.compareSync(data.senha, conta.senha);
      if (match) {
        res.status(200).json({
          nome: conta.nome,
          id_conta: conta.id,
          jwt: jwt.sign({ id: conta.id }, process.env.JWT_PRIVATE_KEY),
        });
      } else {
        res.status(401).json({ msg: "Senha incorreta!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ msg: "Usuário não encontrado." });
    });
}

async function authenticate(req, res, next) {
  console.log("autenticando");
  try {
    jwt.verify(req.headers.auth, process.env.JWT_PRIVATE_KEY);
    next();
  } catch {
    return res.sendStatus(401);
  }
}

module.exports = {
  login,
  authenticate,
};
