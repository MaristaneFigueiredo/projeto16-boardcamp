import { Router } from "express";

import { postGame, getGames } from "../controllers/gamesController.js";

import {
  gameValidation,
  categoryExists,
  gameExists,
} from "../middleswares/gamesMiddleware.js";

const gamesRouter = Router();

//POST games
gamesRouter.post(
  "/games",
  gameValidation,
  categoryExists,
  gameExists,
  postGame
);
//  gamesRouter.post("/games", categoryExists, gameExists, postGame);

//GET games
gamesRouter.get("/games", getGames);

export default gamesRouter;
