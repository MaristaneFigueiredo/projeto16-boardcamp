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
  try {
    const category = await connection.query(`
          SELECT * FROM games
      `);

    res.send(category.rows);
  } catch (error) {
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}
