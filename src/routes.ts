import { Router } from "express";
import { createUserController } from "./useCases/createUser";
import HttpStatusCode from "./util/httpStatusCode";

const router = Router();

router.get("/", (req, res) => {
  return res.status(HttpStatusCode.OK).json({ msg: "server running" }).send();
});

router.post("/users/create", createUserController.handle);

export { router };
