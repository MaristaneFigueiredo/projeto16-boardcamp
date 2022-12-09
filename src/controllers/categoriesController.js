import connection from "../database/db.js";

export async function postCategory(req, res) {
  try {
    // const nameCategory = req.body;
    const nameCategory = req.body.name;
    const category = await connection.query(
      `
            INSERT INTO categories (name)
            VALUES($1)
        `,
      [nameCategory]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}
