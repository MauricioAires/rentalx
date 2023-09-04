import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRequest {
  id: string;
  user_id: string;
}

const MINIMUM_RENTAL_DISTANCE_IN_DAYS = 1;

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}
  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError("Rental does not exist!", 404);
    }

    const car = await this.carsRepository.findById(rental.car_id);

    if (!car) {
      throw new AppError("Car does not exist!", 404);
    }

    let daily = this.dateProvider.compareInDays(rental.expected_return_date);

    /**
     * Não faz sentido essa verificação mas na aula ela colocou ..
     */
    if (daily <= 0) {
      daily = MINIMUM_RENTAL_DISTANCE_IN_DAYS;
    }

    const delay = this.dateProvider.compareInDays(
      null,
      rental.expected_return_date,
    );

    let total = 0;

    if (delay > 0) {
      // Preço por multa
      const calculate_fine = delay * car.fine_amount;

      total = calculate_fine;
    }

    // Preço por diária
    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}
