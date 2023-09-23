import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token,
    );

    if (!userToken) {
      throw new AppError("Token invalid");
    }

    const tokenExpired = this.dateProvider.compareIfBefore(
      userToken.expires_date,
      this.dateProvider.dateNow(),
    );

    if (tokenExpired) {
      throw new AppError("Token expired!");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("User not found!");
    }

    user.password = await hash(password, Number(process.env.BYCRYPT_HASH_SALT));

    await this.usersRepository.create(user);

    /**
     * NOTE: Impedir que seja feito outro reset utilizando
     * o mesmo token
     */
    await this.usersTokensRepository.deleteById(userToken.id);
  }
}
