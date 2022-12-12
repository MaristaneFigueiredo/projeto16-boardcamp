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
    const id = req.body.gameId;
    const game = await gameById(id);

    const stockTotal = game.stockTotal;

    // console.log("stockTotal", stockTotal);

    const rental = await connection.query(
      `
              SELECT COUNT("gameId") FROM rentals WHERE "returnDate" IS NULL AND "gameId" = ($1) 
               `,
      [id]
    );

    const rentalInaccessible = rental.rows[0].count;
    //console.log("rentalInaccessible", rentalInaccessible);

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

export async function rentExists(req, res, next) {
  try {
    const { id } = req.params;

    const rental = await connection.query(
      `    SELECT * FROM rentals WHERE id = $1
      `,
      [id]
    );

    if (rental.rows.length === 0) {
      return res
        .status(404)
        .send({ message: "Este aluguel não foi cadastrado!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
  next();
}
