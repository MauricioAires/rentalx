import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";

import { CreateUserController } from "@modules/accounts/useCases/createUser/createUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/profileUserController";

import upload from "@config/upload";

const usersRoutes = Router();

const uploadAvatar = multer(upload);
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle,
);
usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
