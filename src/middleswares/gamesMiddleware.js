import connection from "../database/db.js";
import gameModel from "../models/gameModel.js";

export function gameValidation(req, res, next) {
  const game = req.body;

  //   const { error } = gameModel.validate(game, { convert: false });
  const { error } = gameModel.validate(game, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(400).send({ message: errors });
    // return res.status(400).send({message: error.details.map( (e) => e.message)})
  }

  next();
}

export async function categoryExists(req, res, next) {
  try {
    const idCategory = req.body.categoryId;

    const category = await connection.query(
      `    SELECT * FROM categories WHERE id = $1
      `,
      [idCategory]
    );

    if (category.rows.length === 0) {
      return res
        .status(400)
        .send({ message: "A categoria informada não existe!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
  next();
}

export async function gameExists(req, res, next) {
  try {
    const nameGame = req.body.name;
    const game = await connection.query(
      `    SELECT * FROM games WHERE name = $1
      `,
      [nameGame]
    );
    if (game.rows.length > 0) {
      return res.status(409).send({ message: "Este jogo já foi cadastrado!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
  next();
}
