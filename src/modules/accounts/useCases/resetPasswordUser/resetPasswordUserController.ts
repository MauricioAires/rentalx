import { Request, Response, request } from "express";
import { container } from "tsyringe";
import { ResetPasswordUserUseCase } from "./resetPasswordUserUseCase";

export class ResetPasswordUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.query;
    const { password } = req.body;

    const resetPasswordUserUseCase = container.resolve(
      ResetPasswordUserUseCase,
    );

    await resetPasswordUserUseCase.execute({
      password,
      token: String(token),
    });

    return res.send();
  }
}
