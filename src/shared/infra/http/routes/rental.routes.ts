import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";
import { CreateRentalController } from "@modules/rentals/useCases/createRental/createRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/devolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/listRentalsByUserController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle,
);
rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle,
);

export { rentalRoutes };
