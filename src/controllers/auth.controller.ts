const connection = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

import { Request, Response, NextFunction} from 'express'

async function login(req: Request, res: Response) {
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

async function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    next();
  } catch {
    return res.sendStatus(401);
  }
}

module.exports = {
  login,
  authenticate,
};
