import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findById(id: string): Promise<Car>;
  findAvailable(
    category_id?: string,
    brand?: string,
    name?: string,
  ): Promise<Car[]>;
  updateAvailable(car_id: string, available: boolean): Promise<void>;
}
