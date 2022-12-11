import { Router } from "express";
import { postRental, getRentals } from "../controllers/rentalsController.js";
import {
  rentalValidation,
  validateAccessibleGame,
} from "../middleswares/rentalsMiddleware.js";
import { customerIdExists } from "../middleswares/customersMiddleware.js";
import { gameIdExists } from "../middleswares/gamesMiddleware.js";

const rentalsRouter = Router();

//POST rentals

// rentalsRouter.post(
//   "/rentals",
//   rentalValidation,
//   customerIdExists,
//   gameIdExists,
//   validateAccessibleGame,
//   postRental
// );
rentalsRouter.post("/rentals", rentalValidation, customerIdExists, postRental);

//GET rentals
rentalsRouter.get("/rentals", getRentals);

export default rentalsRouter;
