import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProfileUserUseCase } from "./profileUserUseCase";

export class ProfileUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const profileUserUseCase = container.resolve(ProfileUserUseCase);

    const user = await profileUserUseCase.execute(id);

    return res.json(user);
  }
}
