import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";
import { Repository, getRepository } from "typeorm";

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return await this.repository.findOne({
      car_id,
      end_date: null,
    });
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return await this.repository.findOne({
      user_id,
      end_date: null,
    });
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    end_date,
    id,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
      end_date,
      id,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne(id);
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    return this.repository.find({
      where: {
        user_id,
      },
      relations: ["car"],
    });
  }
}
