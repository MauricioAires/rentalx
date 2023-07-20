import { Request, Response } from "express";
import { ListSpecificationUseCase } from "./listSpecificationUseCase";
import { container } from "tsyringe";

export class ListSpecificationController {
  handle(req: Request, res: Response): Response {
    const listSpecificationUseCase = container.resolve(
      ListSpecificationUseCase,
    );

    const specifications = listSpecificationUseCase.execute();

    return res.json(specifications);
  }
}
