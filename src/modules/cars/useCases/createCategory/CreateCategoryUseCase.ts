import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";

interface IRequest {
  description: string;
  name: string;
}
@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ description, name }: IRequest): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists!");
    }

    const category = await this.categoriesRepository.create({
      description,
      name,
    });

    return category;
  }
}
