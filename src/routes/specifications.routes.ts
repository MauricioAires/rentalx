import { Router } from "express";
import { SpecificationRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationsRouter = Router();

const specificationRepository = new SpecificationRepository();

specificationsRouter.post("/", (req, res) => {
  return createSpecificationController.handle(req, res);
});

specificationsRouter.get("/", (req, res) => {
  const specifications = specificationRepository.list();

  return res.json(specifications);
});

export { specificationsRouter };
