import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUserUseCase } from "./listRentalsByUserUseCase";

export class ListRentalsByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const listRentalsByUserUseCase = container.resolve(
      ListRentalsByUserUseCase,
    );

    const userRentals = await listRentalsByUserUseCase.execute({
      user_id: id,
    });

    return res.json(userRentals);
  }
}
