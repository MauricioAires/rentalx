import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

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
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  create({ description, name }: ICreateCategoryDTO): void {
    const category = new Category();

    // NOTE: Primeira vez que eu utilizo Object,assign
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  findByName(name: string): Category {
    return this.categories.find((category) => category.name === name);
  }

  list(): Category[] {
    return this.categories;
  }
}
