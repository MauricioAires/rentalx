import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationRepository,
  ) {}
  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(car_id);

    const carDoesNotExists = !car;

    if (carDoesNotExists) {
      throw new AppError("cars does not exists");
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id,
    );

    car.specifications = specifications;

    await this.carsRepository.create(car);

    return car;
  }
}
