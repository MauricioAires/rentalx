import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";
import { Router } from "express";
import { ensureAdmin } from "@shared/infra/http/middleware/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";
import { ListAvailableCarController } from "@modules/cars/useCases/listAvailableCar/listAvailableCarController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCar = new ListAvailableCarController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get("/available", listAvailableCar.handle);

export { carsRoutes };
