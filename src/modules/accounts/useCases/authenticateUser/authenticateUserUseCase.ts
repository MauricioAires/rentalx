import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`E-mail or password is incorrect`, 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(`E-mail or password is incorrect`, 401);
    }

    const token = sign({}, process.env.SECRET_TOKEN, {
      subject: user.id,
      expiresIn: process.env.EXPIRES_TOKEN,
    });

    const refresh_token = sign(
      {
        email,
      },
      process.env.SECRET_REFRESH_TOKEN,
      {
        subject: user.id,
        expiresIn: process.env.EXPIRES_REFRESH_TOKEN,
      },
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      expires_date: this.dateProvider.addDays(
        Number(process.env.EXPIRES_REFRESH_TOKEN_DAYS),
      ),
      refresh_token: refresh_token,
    });

    return {
      token,
      user: {
        email: user.email,
        name: user.name,
      },
      refresh_token,
    };
  }
}
