import { Router } from "express";

import { ensureAdmin } from "@shared/infra/http/middleware/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";

import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";
import { ListAvailableCarController } from "@modules/cars/useCases/listAvailableCar/listAvailableCarController";
import { CreateCarSpecificationsController } from "@modules/cars/useCases/createCarSpecification/createCarSpecificationsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/uploadCarImagesController";

import upload from "@config/upload";
import multer from "multer";

const carsRoutes = Router();

const uploadCarImages = multer(upload);

const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarController();
const crateCarSpecificationsController =
  new CreateCarSpecificationsController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get("/available", listAvailableCarController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  crateCarSpecificationsController.handle,
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array("images"),
  uploadCarImagesController.handle,
);

export { carsRoutes };
