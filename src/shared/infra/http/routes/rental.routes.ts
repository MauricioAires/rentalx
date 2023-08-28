import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";
import { CreateRentalController } from "@modules/rentals/useCases/createRental/createRentalController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);

export { rentalRoutes };
