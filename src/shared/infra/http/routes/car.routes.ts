import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";
import { Router } from "express";
import { ensureAdmin } from "@shared/infra/http/middleware/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";
import { ListAvailableCarController } from "@modules/cars/useCases/listAvailableCar/listAvailableCarController";
import { CreateCarSpecificationsController } from "@modules/cars/useCases/createCarSpecification/createCarSpecificationsController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCar = new ListAvailableCarController();
const crateCarSpecifications = new CreateCarSpecificationsController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get("/available", listAvailableCar.handle);

carsRoutes.get("/specifications/:id", crateCarSpecifications.handle);

export { carsRoutes };
