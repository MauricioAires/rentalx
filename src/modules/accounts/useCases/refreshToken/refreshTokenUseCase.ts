import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IPayload {
  sub: string;
  email: string;
}

interface IResponse {
  token: string;
  refresh_token: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<IResponse> {
    const { sub: user_id, email } = verify(
      token,
      process.env.SECRET_REFRESH_TOKEN,
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
      process.env.SECRET_REFRESH_TOKEN,
      {
        subject: user_id,
        expiresIn: process.env.EXPIRES_REFRESH_TOKEN,
      },
    );

    const newToken = sign({}, process.env.SECRET_TOKEN, {
      subject: user_id,
      expiresIn: process.env.EXPIRES_TOKEN,
    });

    await this.usersTokensRepository.create({
      user_id: user_id,
      expires_date: this.dateProvider.addDays(
        Number(process.env.EXPIRES_REFRESH_TOKEN_DAYS),
      ),
      refresh_token: refresh_token,
    });

    return {
      token: newToken,
      refresh_token,
    };
  }
}
