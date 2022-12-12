import { Router } from "express";
import {
  postRental,
  getRentals,
  endRental,
} from "../controllers/rentalsController.js";
import {
  rentalValidation,
  validateAccessibleGame,
  rentExists,
} from "../middleswares/rentalsMiddleware.js";
import { customerIdExists } from "../middleswares/customersMiddleware.js";
import { gameIdExists } from "../middleswares/gamesMiddleware.js";

const rentalsRouter = Router();

//POST rentals
rentalsRouter.post(
  "/rentals",
  rentalValidation,
  customerIdExists,
  gameIdExists,
  validateAccessibleGame,
  postRental
);

//GET rentals
rentalsRouter.get("/rentals", getRentals);

//GET rentals
rentalsRouter.post("/rentals/:id/return", rentExists, endRental);

export default rentalsRouter;
