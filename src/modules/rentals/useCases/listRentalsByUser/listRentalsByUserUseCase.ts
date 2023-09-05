import { inject, injectable } from "tsyringe";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRequest {
  user_id: string;
}

@injectable()
export class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<Rental[]> {
    return this.rentalsRepository.findByUserId(user_id);
  }
}
