import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/createSpecificationController";
import { ListSpecificationController } from "@modules/cars/useCases/listSpecification/listSpecificationController";

import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";
import { ensureAdmin } from "@shared/infra/http/middleware/ensureAdmin";

const specificationsRouter = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRouter.get("/", listSpecificationController.handle);

specificationsRouter.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle,
);

export { specificationsRouter };
