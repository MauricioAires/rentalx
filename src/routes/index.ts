import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", categoriesRoutes);

export { router };
