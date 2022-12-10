import { Router } from "express";
import {
  postCustomer,
  alterCustomer,
  getCustomers,
  getIdCustomer,
} from "../controllers/customersController.js";
import {
  customerValidation,
  customerExists,
  idCustomerExists,
} from "../middleswares/customersMiddleware.js";

const customersRouter = Router();

//POST customers
customersRouter.post(
  "/customers",
  customerValidation,
  customerExists,
  postCustomer
);

//PUT customers
customersRouter.put(
  "/customers/:id",
  customerValidation,
  idCustomerExists,
  customerExists,
  alterCustomer
);

//GET customers
customersRouter.get("/customers", getCustomers);

//GET customers id
customersRouter.get("/customers/:id", idCustomerExists, getIdCustomer);

export default customersRouter;
