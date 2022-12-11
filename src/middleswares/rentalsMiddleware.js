import connection from "../database/db.js";
import rentalModel from "../models/rentalModel.js";
import { gameById } from "./gamesMiddleware.js";

export function rentalValidation(req, res, next) {
  const rental = req.body;
  const { error } = rentalModel.validate(rental, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(400).send({ message: errors });
  }
  next();
}

export async function validateAccessibleGame(req, res, next) {
  try {
    const { id } = req.body.gameId;
    const game = await gameById(id);
    const stockTotal = game.stockTotal;

    const rental = await connection.query(
      `
              SELECT COUNT("gameId") FROM rentals WHERE "returnDate" IS NULL AND "gameId" = ($1) 
               `,
      [id]
    );

    const rentalInaccessible = rental.rows[0].count;
    console.log("rentalInaccessible", rentalInaccessible);

    if (stockTotal <= rentalInaccessible) {
      return res.status(400).send({
        message: "Aluguel indisponível! Todos os jogo(s) se encontram alugados",
      });
    }

    next();
  } catch (error) {
    // console.error(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}
