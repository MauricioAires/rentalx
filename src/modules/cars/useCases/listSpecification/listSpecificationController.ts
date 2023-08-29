import { Request, Response } from "express";
import { ListSpecificationUseCase } from "./listSpecificationUseCase";
import { container } from "tsyringe";

export class ListSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listSpecificationUseCase = container.resolve(
      ListSpecificationUseCase,
    );

    const specifications = await listSpecificationUseCase.execute();

    return res.json(specifications);
  }
}
