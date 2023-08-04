import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { Specification } from "@modules/cars/entities/Specification";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class ListSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository,
  ) {}

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationRepository.list();

    return specifications;
  }
}
