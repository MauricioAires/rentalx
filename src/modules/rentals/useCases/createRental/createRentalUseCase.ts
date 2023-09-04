import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const MINIMUM_RENTAL_DISTANCE_IN_HOURS = 24;

    const carAlreadyOpenRental =
      await this.rentalsRepository.findOpenRentalByCarId(car_id);

    if (carAlreadyOpenRental) {
      throw new AppError("Car already rented");
    }

    const userHasOpenRental =
      await this.rentalsRepository.findOpenRentalByUserId(user_id);

    if (userHasOpenRental) {
      throw new AppError("There's a rental in progress for user!");
    }

    const compare = this.dateProvider.compareInHours(expected_return_date);

    if (compare < MINIMUM_RENTAL_DISTANCE_IN_HOURS) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}
