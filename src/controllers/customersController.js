import connection from "../database/db.js";

export async function postCustomer(req, res) {
  try {
    const { name, phone, cpf, birthday } = req.body;
    const customer = await connection.query(
      `
        INSERT INTO customers (name, phone, cpf, birthday) VALUES($1, $2, $3, $4)
    `,
      [name, phone, cpf, birthday]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}

export async function getCustomers(req, res) {
  //   const name = req.query.name;
  //   let customer = [];
  //   try {
  //     if (name === undefined) {
  //       game = await connection.query(`
  //           SELECT * FROM customers
  //       `);
  //     } else {
  //       game = await connection.query(
  //         `
  //           SELECT * FROM customers WHERE name LIKE ($1)
  //       `,
  //         [name + "%"]
  //       );
  //     }
  //     res.send(customer.rows);
  //   } catch (error) {
  //     return res.status(500).send({ message: "Erro inesperado no servidor!" });
  //   }
}
