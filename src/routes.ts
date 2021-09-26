import { Router } from "express";
import { createUserController } from "./useCases/createUser";

const router = Router();

router.get("/", (req, res) => {
  return res.status(201).json({ msg: "server running" }).send();
});

router.post("/users/create", createUserController.handle);

export { router };
