import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";

import { CreateUserController } from "@modules/accounts/useCases/createUser/createUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";

import upload from "@config/upload";

const usersRoutes = Router();

const uploadAvatar = multer(upload.execute("./tmp/avatar"));
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle,
);

export { usersRoutes };
