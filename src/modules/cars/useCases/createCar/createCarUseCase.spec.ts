import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./createCarUseCase";
import { AppError } from "@shared/errors/AppError";

describe("Create Car", () => {
  let createCarUseCase: CreateCarUseCase;
  let carsRepository: CarsRepositoryInMemory;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_id",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a new car with license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name Car 01",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category_id",
      });

      await createCarUseCase.execute({
        name: "Name Car 02",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category_id",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car 01",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_id",
    });

    expect(car.available).toBeTruthy();
  });
});
