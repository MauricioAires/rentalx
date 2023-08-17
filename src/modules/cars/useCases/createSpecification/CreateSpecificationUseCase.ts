import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository,
  ) {}

  async execute({ description, name }: IRequest): Promise<Specification> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError(`Specification ${name} already exists`);
    }

    const specification = await this.specificationRepository.create({
      description,
      name,
    });

    return specification;
  }
}
