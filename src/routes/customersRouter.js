import { Router } from "express";
import {
  postCustomer,
  alterCustomer,
  getCustomers,
  getIdCustomer,
} from "../controllers/customersController.js";
import {
  customerValidation,
  cpfExists,
  customerIdExists,
} from "../middleswares/customersMiddleware.js";

const customersRouter = Router();

//POST customers
customersRouter.post("/customers", customerValidation, cpfExists, postCustomer);

//PUT customers
customersRouter.put(
  "/customers/:id",
  customerValidation,
  customerIdExists,
  cpfExists,
  alterCustomer
);

//GET customers
customersRouter.get("/customers", getCustomers);

//GET customers id
customersRouter.get("/customers/:id", customerIdExists, getIdCustomer);

export default customersRouter;
