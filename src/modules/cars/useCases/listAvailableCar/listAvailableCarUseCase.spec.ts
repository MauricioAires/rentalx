import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarUseCase } from "./listAvailableCarUseCase";

describe("List Cars", () => {
  let listAvailableCarUseCase: ListAvailableCarUseCase;
  let carsRepositoryInMemory: CarsRepositoryInMemory;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarUseCase = new ListAvailableCarUseCase(
      carsRepositoryInMemory,
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi A3",
      description: "Carro rápido",
      daily_rate: 110,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Audi",
      category_id: "5b2601d4-7981-47f1-b800-0df233485e82",
    });

    const cars = await listAvailableCarUseCase.execute({});

    expect(cars).toStrictEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_name_test",
      description: "Carro rápido",
      daily_rate: 110,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Audi",
      category_id: "5b2601d4-7981-47f1-b800-0df233485e82",
    });

    const cars = await listAvailableCarUseCase.execute({
      name: "Car_name_test",
    });

    expect(cars).toStrictEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi A3",
      description: "Carro rápido",
      daily_rate: 110,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car_bran_test",
      category_id: "5b2601d4-7981-47f1-b800-0df233485e82",
    });

    const cars = await listAvailableCarUseCase.execute({
      brand: "Car_bran_test",
    });

    expect(cars).toStrictEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi A3",
      description: "Carro rápido",
      daily_rate: 110,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car_bran_test",
      category_id: "12345",
    });

    const cars = await listAvailableCarUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toStrictEqual([car]);
  });
});
