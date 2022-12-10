import connection from "../database/db.js";
import categoryModel from "../models/categoryModel.js";

export function categoryValidation(req, res, next) {
  const category = req.body;
  const { error } = categoryModel.validate(category);
  if (error) {
    return res
      .status(400)
      .send({ message: "O nome da categoria deve ser informado!" });
  }

  next();
}

export async function categoryExists(req, res, next) {
  try {
    const nameCategory = req.body.name;

    const category = await connection.query(
      `    SELECT * FROM categories WHERE name = $1
      `,
      [nameCategory]
    );

    if (category.rows.length > 0) {
      return res
        .status(409)
        .send({ message: "Esta categoria já foi cadastrada!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
  next();
}
