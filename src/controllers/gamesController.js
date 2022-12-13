import connection from "../database/db.js";

export async function postGame(req, res) {
  try {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    const game = await connection.query(
      `
        INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES($1, $2, $3, $4, $5)
    `,
      [name, image, stockTotal, categoryId, pricePerDay]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}

export async function getGames(req, res) {
  const name = req.query.name;
  let game = [];

  try {
    if (name === undefined) {
      game = await connection.query(`
          SELECT * FROM games
      `);
    } else {
      // SELECT * FROM games WHERE name LIKE $1
      game = await connection.query(
        `
          
          SELECT * FROM games WHERE lower(name) LIKE lower($1)
          
      `,
        [name + "%"]
      );
    }

    res.send(game.rows);
  } catch (error) {
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}
