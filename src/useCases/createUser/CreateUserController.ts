import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, birthDate } = req.body;

    try {
      await this.createUserUseCase.execute({
        name,
        email,
        password,
        birthDate,
      });

      return res.status(200).send();
    } catch (error) {
      return res
        .status(400)
        .json({ message: error.message || "Unexpected error" });
    }
  }
}
