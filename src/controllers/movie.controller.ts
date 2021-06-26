const connection = require("../database/connection");
const { v4: uuidv4 } = require("uuid");

async function putMovie(req, res) {
  const data = req.body;

  await connection("filmes")
    .where({ id_filme: data.id, id_perfil: data.id_perfil })
    .first()
    .then(async (result) => {
      if (result) return res.status(400).json({ msg: "Filme já adicionado." });

      const movie = {
        id: uuidv4(),
        nome: data.title,
        id_filme: data.id,
        id_perfil: data.id_perfil,
        poster: data.poster,
        assistido: false,
      };
      await connection("filmes")
        .insert(movie)
        .then(() => {
          res.status(200).json({ msg: "Filme adicionado com sucesso!" });
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
}

async function listMovies(req, res) {
  const data = req.body;
  return await connection("filmes")
    .where("id_perfil", data.id_perfil)
    .select("*")
    .orderBy("id_filme")
    .then((filmes) => {
      res.status(200).json(filmes);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
}

async function setToWatched(req, res) {
  const data = req.body;
  const assistido = data.assistido ? false : true;

  return await connection("filmes")
    .where("id", data.id)
    .update({ assistido: assistido })
    .then(() => {
      const msg = assistido ? "Filme assistido." : "Filme não assistido.";
      res.status(200).json({ msg: msg });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

module.exports = {
  putMovie,
  listMovies,
  setToWatched,
};
