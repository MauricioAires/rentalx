import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarUseCase } from "./listAvailableCarUseCase";

export class ListAvailableCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { brand, name, category_id } = req.query;

    const listAvailableCarUseCase = container.resolve(ListAvailableCarUseCase);

    const cars = await listAvailableCarUseCase.execute({
      brand: brand as string,
      category_id: category_id as string,
      name: name as string,
    });

    return res.json(cars);
  }
}
