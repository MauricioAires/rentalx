import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { password, email } = req.body;

      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase,
      );

      const token = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return res.json({
        token,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}
