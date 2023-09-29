import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

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
      process.env.SECRET_TOKEN,
    ) as IPayload;

    const usersRepository = await new UsersRepository().findById(user_id);

    if (!usersRepository) {
      throw new AppError("User does not exist", 401);
    }

    req.user = {
      id: user_id,
    };

    next();
  } catch (err) {
    throw new AppError(err.message, 401);
  }
}
