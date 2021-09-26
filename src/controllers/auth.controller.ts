import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import DatabaseRequester from "../controllers/DatabaseRequester";

import { Request, Response, NextFunction } from "express";

interface Account {
  id: string;
  name: string;
  password_hash: string;
  email: string;
  birthdate: string;
  created_at: string;
  timestamp: string;
}

export default class AuthController extends DatabaseRequester {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await this.dbRequest<Account>("accounts")
      .select("*")
      .where("email", email)
      .first();

    const match = bcrypt.compareSync(password, user?.password_hash || "");

    if (match) {
      return res.status(200).json({
        name: user?.name,
        account_id: user?.id,
        jwt: jwt.sign({ id: user?.id }, process.env.JWT_PRIVATE_KEY || ""),
      });
    } else {
      return res.sendStatus(404);
    }
  }

  async authenticate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    const token = req.headers.authorization?.split(" ")[1];

    try {
      jwt.verify(token || "", process.env.JWT_PRIVATE_KEY || "");
      next();
    } catch {
      return res.sendStatus(401);
    }
  }
}
