import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    /**
     *  NOTE: tsyringe remove a necessidade de realizar instancias das
     * classes
     */
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    createCategoryUseCase.execute({
      name,
      description,
    });

    return res.status(201).send();
  }
}
