import { Router } from "express";
import {
  postCustomer,
  getCustomers,
} from "../controllers/customersController.js";
import {
  customerValidation,
  customerExists,
} from "../middleswares/customersMiddleware.js";

const customersRouter = Router();

//POST customers
customersRouter.post(
  "/customers",
  customerValidation,
  customerExists,
  postCustomer
);

//GET customers
customersRouter.get("/customers", getCustomers);

export default customersRouter;
