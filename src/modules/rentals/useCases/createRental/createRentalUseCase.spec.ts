import { v4 as uuidV4 } from "uuid";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";

import { CreateRentalUseCase } from "./createRentalUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

dayjs.extend(utc);

describe("Create Rental", () => {
  let createRentalUseCase: CreateRentalUseCase;
  let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let dayjsProvider: DayjsDateProvider;

  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsProvider,
      carsRepositoryInMemory,
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "test",
      description: "test description",
      daily_rate: 100,
      license_plate: "TEST",
      fine_amount: 60,
      category_id: "TEST",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: uuidV4(),
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
    expect(rental).toMatchObject({
      id: expect.any(String),
      user_id: expect.any(String),
      car_id: expect.any(String),
      expected_return_date: expect.any(Date),
      start_date: expect.any(Date),
    });
  });

  it("should not be able to create a new rental if there another open to the same user", async () => {
    const user_id = uuidV4();

    const car = await carsRepositoryInMemory.create({
      name: "test1",
      description: "test description1",
      daily_rate: 100,
      license_plate: "TEST1",
      fine_amount: 60,
      category_id: "TEST1",
      brand: "brand1",
    });
    const car2 = await carsRepositoryInMemory.create({
      name: "test2",
      description: "test description2",
      daily_rate: 100,
      license_plate: "TEST2",
      fine_amount: 60,
      category_id: "TEST2",
      brand: "brand2",
    });

    await createRentalUseCase.execute({
      user_id,
      car_id: car2.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id,
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });

  it("should not be able to create a new rental if there another open to the same car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "test",
      description: "test description",
      daily_rate: 100,
      license_plate: "TEST",
      fine_amount: 60,
      category_id: "TEST",
      brand: "brand",
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: uuidV4(),
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: uuidV4(),
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError("Car already rented"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: uuidV4(),
        user_id: uuidV4(),
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
