import { v4 } from "uuid";
import { Request, Response } from "express";
import DatabaseRequester from "./DatabaseRequester";

interface Movie {
  id: string;
  movie_id: string;
  profile_id: string;
  name: string;
  poster: string;
  watched: boolean;
  created_at: string;
}

export default class MovieController extends DatabaseRequester {
  async putMovie(req: Request, res: Response) {
    const data = req.body;

    const movie = await this.dbRequest<Movie>("movies")
      .where({ movie_id: data.id, profile_id: data.profile_id })
      .first();

    if (movie) {
      return res.status(400);
    }

    const newMovie = {
      id: v4(),
      movie_id: data.id,
      profile_id: data.profile_id,
      name: data.title,
      poster: data.poster,
      watched: false,
    };

    try {
      await this.dbRequest("movies").insert(newMovie);

      return res.status(200);
    } catch (error) {
      console.log(error);

      return res.status(400);
    }
  }

  async listMovies(profile_id: string): Promise<Movie[]> {
    return await this.dbRequest("movies")
      .where("profile_id", profile_id)
      .select("*")
      .orderBy("created_at");
  }
}

async function listMovies(req, res) {
  const data = req.body;
  return await connection("movies")
    .where("id_perfil", data.id_perfil)
    .select("*")
    .orderBy("id_filme")
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
}

async function setToWatched(req, res) {
  const data = req.body;
  const assistido = data.assistido ? false : true;

  return await connection("movies")
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
