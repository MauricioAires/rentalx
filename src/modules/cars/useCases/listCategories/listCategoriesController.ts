import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./listCategoriesUseCase";
import { container } from "tsyringe";

export class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const categories = await listCategoriesUseCase.execute();

    return res.json(categories);
  }
}
