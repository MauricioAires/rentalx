import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_names: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,
  ) {}

  async execute({ car_id, images_names }: IRequest): Promise<void> {
    images_names.forEach((image_name) => {
      this.carsImagesRepository.create(car_id, image_name);
    });
  }
}
