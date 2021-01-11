const routes = require("express").Router();

const userController = require("./controllers/user.controller");
const authController = require("./controllers/auth.controller");
const movieController = require("./controllers/movie.controller");

routes.get("/", (req, res) => {
  console.log("alou mundão");
  return res.sendStatus(200);
});

routes.post("/create_account", userController.create);
routes.get("/list_accounts", userController.listUsers);
routes.post("/create_profile", userController.createProfile);

routes.post("/login", authController.login);

// routes.use(authController.authenticate); //middleware que autentica e valida o JWT do usuário

routes.post("/list_profiles", userController.listProfiles);
routes.post("/put_movie", movieController.putMovie);
routes.post("/list_movies", movieController.listMovies);
routes.post("/watched", movieController.setToWatched);

module.exports = routes;
