import { Router } from "express";
import {
  postCategory,
  getCategories,
} from "../controllers/categoriesController.js";
import {
  categoryValidation,
  categoryExists,
} from "../middleswares/categoriesMiddleware.js";

const categoriesRouter = Router();

//POST categories
categoriesRouter.post(
  "/categories",
  categoryValidation,
  categoryExists,
  postCategory
);

//GET categories
categoriesRouter.get("/categories", getCategories);
export default categoriesRouter;
