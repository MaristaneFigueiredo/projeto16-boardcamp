import { Router } from "express";
import {
  postRental,
  getRentals,
  endRental,
  deleteRental,
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

//POST rentals id
rentalsRouter.post("/rentals/:id/return", rentExists, endRental);

//DELETE rentals id
rentalsRouter.delete("/rentals/:id", rentExists, deleteRental);

export default rentalsRouter;
