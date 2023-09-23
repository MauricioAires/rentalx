import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  userTokens: UserTokens[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    return this.userTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token,
    );
  }

  async deleteById(refresh_token_id: string): Promise<void> {
    const userTokenIndex = this.userTokens.findIndex(
      (userToken) => userToken.id === refresh_token_id,
    );

    this.userTokens.splice(userTokenIndex);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.userTokens.find(
      (userToken) => userToken.refresh_token === refresh_token,
    );
  }
}
