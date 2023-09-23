import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/createUserUseCase";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "User Test",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
    expect(result).toMatchObject({
      token: expect.any(String),
      user: {
        email: expect.any(String),
        name: expect.any(String),
      },
    });
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "User Test",
    };
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: user.password,
      }),
    ).rejects.toEqual(new AppError("E-mail or password is incorrect", 401));
  });

  it("should not be able to authenticate with incorrect email", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "User Test",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: "incorrectEmail",
        password: user.password,
      }),
    ).rejects.toEqual(new AppError("E-mail or password is incorrect", 401));
  });
});
