import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

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
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error(`E-mail or password is incorrect`);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error(`E-mail or password is incorrect`);
    }

    const token = sign({}, "22d93c2a430a360d00ea2eaf25635381", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      token,
      user: {
        email: user.email,
        name: user.name,
      },
    };
  }
}
