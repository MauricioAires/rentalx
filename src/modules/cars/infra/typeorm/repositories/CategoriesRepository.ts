import { Repository, getRepository } from "typeorm";
import { Category } from "../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";

/**
 * NOTE: Os repositories são os arquivos que
 * possui a responsabilidade de realizar a comunicação com
 * o banco de dados
 */

/**
 * NOTE: Patter -> Singleton
 * Ele garante que uma classe possua apenas uma instância e
 * fornece um ponto global de acesso a essa instância.
 */

export class CategoriesRepository implements ICategoriesRepository {
  // private static INSTANCE: CategoriesRepository;
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  // public static getInstance(): CategoriesRepository {
  //   if (!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }

  //   return CategoriesRepository.INSTANCE;
  // }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({
      name,
    });

    return category;
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }
}
