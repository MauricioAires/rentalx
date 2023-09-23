import { sign, verify } from "jsonwebtoken";
import { inject } from "tsyringe";

import auth from "@config/auth";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IPayload {
  sub: string;
  email: string;
}

export class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<string> {
    const { sub: user_id, email } = verify(
      token,
      auth.secrete_refresh_token,
    ) as IPayload;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      );

    if (!userToken) {
      throw new AppError("Refresh token does not exists!");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    /**
     * NOTE: A função de gerar o refresh token é uma função muito
     * sensível acredito que ela não deveria está em duplicidade
     * porque caso precise modificar vai ser necessário alterar em dois
     * locais e pode esquecer
     */
    const refresh_token = sign(
      {
        email,
      },
      auth.secrete_refresh_token,
      {
        subject: user_id,
        expiresIn: auth.expires_refresh_token,
      },
    );

    await this.usersTokensRepository.create({
      user_id: user_id,
      expires_date: this.dateProvider.addDays(auth.expires_refresh_token_days),
      refresh_token: refresh_token,
    });

    return refresh_token;
  }
}
