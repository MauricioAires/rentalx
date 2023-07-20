import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./listCategoriesUseCase";

export class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const categories = await this.listCategoriesUseCase.execute();

    return res.json(categories);
  }
}
