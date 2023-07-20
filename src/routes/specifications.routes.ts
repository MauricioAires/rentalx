import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/createSpecificationController";
import { ListSpecificationController } from "../modules/cars/useCases/listSpecification/listSpecificationController";

const specificationsRouter = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRouter.post("/", createSpecificationController.handle);
specificationsRouter.get("/", listSpecificationController.handle);

export { specificationsRouter };
