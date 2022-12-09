import { Router } from "express";
import { postCategory } from "../controllers/categoriesController.js";
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
export default categoriesRouter;
