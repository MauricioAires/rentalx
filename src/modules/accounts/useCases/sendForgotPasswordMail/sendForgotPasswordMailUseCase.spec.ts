import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./sendForgotPasswordMailUseCase";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let userRepositoryInMemory: UserRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe("sendForgotPasswordMailUseCase", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory,
    );
  });

  it("should be able to send a forgot password email to user ", async () => {
    const sendEmail = jest.spyOn(mailProviderInMemory, "sendEmail");

    await userRepositoryInMemory.create({
      driver_license: "436617221",
      email: "idewujvi@lazwirhab.fi",
      name: "Tom Potter",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("idewujvi@lazwirhab.fi");

    expect(sendEmail).toHaveBeenCalled();
  });

  it("should not be able to send an email is user does not exist", async () => {
    await expect(() => {
      return sendForgotPasswordMailUseCase.execute("inta@ba.mc");
    }).rejects.toEqual(new AppError("User not found!", 404));
  });

  it("should be able to create  an user token", async () => {
    const usersTokensRepositoryInMemoryCreate = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create",
    );

    await userRepositoryInMemory.create({
      driver_license: "998530156",
      email: "me@fuj.ec",
      name: "Tom Potter",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("me@fuj.ec");

    expect(usersTokensRepositoryInMemoryCreate).toHaveBeenCalled();
  });
});
