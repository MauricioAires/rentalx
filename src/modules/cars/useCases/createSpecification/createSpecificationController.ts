import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { container } from "tsyringe";

export class CreateSpecificationController {
  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase,
    );

    createSpecificationUseCase.execute({
      description,
      name,
    });

    return res.status(201).send();
  }
}
