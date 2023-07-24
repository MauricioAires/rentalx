import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";
import { AppError } from "../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "22d93c2a430a360d00ea2eaf25635381",
    ) as IPayload;

    const usersRepository = await new UsersRepository().findById(user_id);

    if (!usersRepository) {
      throw new AppError("User does not exist", 401);
    }

    next();
  } catch (err) {
    throw new AppError(err.message, 401);
  }
}
