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
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsProvider,
      carsRepositoryInMemory,
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: uuidV4(),
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
    expect(async () => {
      const user_id = uuidV4();

      await createRentalUseCase.execute({
        user_id,
        car_id: uuidV4(),
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id,
        car_id: uuidV4(),
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there another open to the same car", async () => {
    expect(async () => {
      const car_id = uuidV4();

      await createRentalUseCase.execute({
        car_id,
        user_id: uuidV4(),
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id,
        user_id: uuidV4(),
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: uuidV4(),
        user_id: uuidV4(),
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
