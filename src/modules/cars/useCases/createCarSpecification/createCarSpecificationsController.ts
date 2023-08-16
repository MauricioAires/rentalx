import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";

export class CreateCarSpecificationsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: car_id } = req.params;
    const { specifications_id } = req.body;

    const createCarSpecifications = container.resolve(
      CreateCarSpecificationUseCase,
    );

    const carSpecifications = await createCarSpecifications.execute({
      car_id,
      specifications_id,
    });

    return res.json(carSpecifications);
  }
}
