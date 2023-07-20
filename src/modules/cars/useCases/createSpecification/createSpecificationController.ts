import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { container } from "tsyringe";

export class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description } = req.body;

      const createSpecificationUseCase = container.resolve(
        CreateSpecificationUseCase,
      );

      await createSpecificationUseCase.execute({
        description,
        name,
      });

      return res.status(201).send();
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }
}
